// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first

import "./ThankYou.css";
import M from "materialize-css";
import axios from "axios";

class ThankYou extends React.Component {
    // storing link to tasks

    state = {
       VP_id:"Error within Database."
    };

    componentDidMount() {
        axios.get(`/api/solutionCanu/${this.props.match.params.studyid}/${
            this.props.match.params.groupid}`)
            .then(res => {
                console.log(res);
                this.setState({VP_id:res.data});
                /*axios.get('/api/solutionCanu/clearCookie')
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err.response);
                    });*/
            })
            .catch(err => {
                console.log(err.response);
            });
        const blockSize = 35;
        const stepSpeed = 110;
        const fallSpeed = 1500;
        const container = document.body;

        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;

        const xBlockCount = Math.ceil(viewWidth / blockSize);
        const yBlockCount = Math.ceil(viewHeight / blockSize);
        let currentYIndex = 0;

        const STATES = {
            EMPTY: 'empty',
            TEST: 'test',
            INVALID: 'invalid',
            BLOCK: 'block',
            DONE: 'done',
        };

        const SHAPES = [
            V_LINE,
            H_LINE,
            BOX,
            DOT,
            L_SHAPE_1,
            L_SHAPE_2,
            L_SHAPE_3,
            L_SHAPE_4,
            L_SHAPE_5,
            L_SHAPE_6,
            L_SHAPE_7,
            L_SHAPE_8,
            Z_SHAPE_1,
            Z_SHAPE_2,
            Z_SHAPE_3,
            Z_SHAPE_4,
            T_SHAPE_1,
            T_SHAPE_2,
            T_SHAPE_3,
            T_SHAPE_4,
        ];

        let grid = Array.from({ length: yBlockCount }, () => {
            return Array.from({ length: xBlockCount}, () => {
                return STATES.EMPTY
            })
        });

        addPiece();

        async function addPiece() {
            let x;
            let y;
            [x, y] = getCoordinates();
            await testShapes(x, y);
            let lastLineHasEmptyBlocks = currentYIndex < (yBlockCount - 1) || grid[yBlockCount - 1].some(x => x === STATES.EMPTY)

            if (lastLineHasEmptyBlocks) {
                addPiece()
            }
        }

        function getCoordinates() {
            const lineIsFull = !grid[currentYIndex].some(state => state === STATES.EMPTY);
            const lastLine = currentYIndex === (yBlockCount - 1);

            if (lineIsFull && !lastLine) {
                currentYIndex++
            }

            let randomX = Math.floor(Math.random() * xBlockCount);

            while (grid[currentYIndex][randomX] !== STATES.EMPTY) {
                // randomX = Math.floor(Math.random() * xBlockCount)
                if (randomX === (xBlockCount - 1)) {
                    randomX = 0
                } else {
                    randomX++
                }
            }

            return [randomX, currentYIndex]
        }

        async function testShapes(x, y) {
            const shapeFunction = getRandomShapeFunction();
            const shapeCoords = shapeFunction(x, y);
            if (invalidShapeCoords(shapeCoords)) {
                return
            }
            const previousShapeCoordsStates = [];
            let invalid = false;

            shapeCoords.forEach(([x, y]) => {
                if (!grid[y] || !grid[y][x]) {
                    invalid = true
                }
                previousShapeCoordsStates.push(grid[y][x]);
                grid[y][x] = STATES.TEST
            });

            await draw(stepSpeed);

            if (invalid || invalidPoints(shapeCoords, previousShapeCoordsStates)) {
                setPoints(shapeCoords, STATES.INVALID);

                await draw(stepSpeed);

                shapeCoords.forEach(([x, y], index) => {
                    if (grid[y] && grid[y][x]) {
                        grid[y][x] = previousShapeCoordsStates[index]
                    }
                });

                await draw(stepSpeed)
            } else {
                setPoints(shapeCoords, STATES.BLOCK);

                await draw(fallSpeed)
            }
        }

        function invalidShapeCoords(shapeCoords) {
            return shapeCoords.some(([x, y]) => {
                if (!grid[y] || !grid[y][x]) {
                    return true
                }
            })
        }

        function createBlock(type, x, y) {
            const blockElement = document.createElement('div');
            blockElement.classList.add('block', `block--${type}`);
            blockElement.style.height = blockElement.style.width = `${blockSize}px`;
            blockElement.style.bottom = `${y * blockSize}px`;
            blockElement.style.left = `${x * blockSize}px`;
            if (type === STATES.BLOCK) {
                blockElement.style.animationDuration = `${fallSpeed}ms`
            }
            container.appendChild(blockElement);
            return blockElement
        }

        function hasAccessibleX(y) {
            return grid[y].some((state, x) => {
                let accessible = true;
                if (state !== STATES.EMPTY) {
                    accessible = false;
                }

                grid.forEach((row, index) => {
                    if (index > y && row[x] !== STATES.EMPTY) {
                        accessible = false;
                    }
                });

                return accessible
            })
        }

        function invalidPoints(shapeCoords, previousShapeCoordsStates) {
            let invalid = false;
            if (previousShapeCoordsStates.some(point => point !== STATES.EMPTY)) {
                invalid = true;
            }

            let checkedXPoints = [];

            const bottomPoints = shapeCoords.filter(([x, y]) => {
                let bottom = true;
                shapeCoords.forEach(([xCompare, yCompare]) => {
                    if (x === xCompare && y > yCompare) {
                        bottom = false
                    }
                });

                return bottom
            });

            bottomPoints.find(([x, y]) => {
                if (checkedXPoints.includes(x)) {
                    return
                }

                for (let i = (y - 1); i >= 0;i--) {
                    if (grid[i] && grid[i][x] === STATES.EMPTY) {
                        invalid = true;
                        break
                    }
                }
                checkedXPoints.push(x)
            });

            return invalid
        }

        function getRandomShapeFunction() {
            const index = Math.floor(Math.random() * SHAPES.length);
            return SHAPES[index]
        }

        function setPoints(points, state) {
            points.forEach(([x, y]) => {
                if (grid[y] && grid[y][x]) {
                    grid[y][x] = state
                }
            })
        }

        async function draw(showFor) {
            Array.from(container.children).forEach(child => {
                if (child.classList.contains(`block--${STATES.INVALID}`) || child.classList.contains(`block--${STATES.TEST}`)) {
                    child.remove()
                }
            });

            const tempBlocks = [];
            grid = grid.map((y, yIndex) => {
                return y.map((x, xIndex) => {
                    if (![STATES.EMPTY, STATES.DONE].includes(x)) {
                        createBlock(x, xIndex, yIndex);

                        if (x === STATES.BLOCK) {
                            tempBlocks.push(createBlock(STATES.TEST, xIndex, yIndex))
                        }
                    }

                    if (x === STATES.BLOCK) {
                        return STATES.DONE
                    } else {
                        return x
                    }
                })
            });

            if (showFor) {
                await sleep(showFor)
            }

            tempBlocks.forEach(block => block.remove())
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        /*
          1
          2
          3
          4
        */
        function V_LINE(x, y) {
            return [
                [x, y],
                [x, y + 1],
                [x, y + 2],
                [x, y + 3],
            ]
        }

        /*
          1 2 3 4
        */
        function H_LINE(x, y) {
            return [
                [x, y],
                [x + 1, y],
                [x + 2, y],
                [x + 3, y],
            ]
        }

        /*
          1 2
          3 4
        */
        function BOX(x, y) {
            return [
                [x, y],
                [x + 1, y],
                [x, y + 1],
                [x + 1, y + 1],
            ]
        }

        /*
          1
        */
        function DOT(x, y) {
            return [
                [x, y]
            ]
        }

        /*
          1
          2
          3 4
        */
        function L_SHAPE_1(x, y) {
            return [
                [x, y],
                [x, y + 1],
                [x, y + 2],
                [x + 1, y + 2],
            ]
        }

        /*
              1
          4 3 2
        */
        function L_SHAPE_2(x, y) {
            return [
                [x, y],
                [x, y + 1],
                [x - 1, y + 1],
                [x - 2, y + 1],
            ]
        }

        /*
          1 2
            3
            4
        */
        function L_SHAPE_3(x, y) {
            return [
                [x, y],
                [x + 1, y],
                [x + 1, y + 1],
                [x + 1, y + 2]
            ]
        }

        /*
          3 2 1
          4
        */
        function L_SHAPE_4(x, y) {
            return [
                [x, y],
                [x - 1, y],
                [x - 2, y],
                [x - 2, y + 1]
            ]
        }

        /*
            1
            2
          4 3
        */
        function L_SHAPE_5(x, y) {
            return [
                [x, y],
                [x, y + 1],
                [x, y + 2],
                [x - 1, y + 2]
            ]
        }

        /*
          1
          2 3 4
        */
        function L_SHAPE_6(x, y) {
            return [
                [x, y],
                [x, y + 1],
                [x + 1, y + 1],
                [x + 2, y + 1]
            ]
        }

        /*
          2 1
          3
          4
        */
        function L_SHAPE_7(x, y) {
            return [
                [x, y],
                [x - 1, y],
                [x - 1, y + 1],
                [x - 1, y + 2]
            ]
        }

        /*
          1 2 3
              4
        */
        function L_SHAPE_8(x, y) {
            return [
                [x, y],
                [x + 1, y],
                [x + 2, y],
                [x + 2, y + 1]
            ]
        }

        /*
          1 2
            3 4
        */
        function Z_SHAPE_1(x, y) {
            return [
                [x, y],
                [x + 1, y],
                [x + 1, y + 1],
                [x + 2, y + 1]
            ]
        }

        /*
          1
          2 3
            4
        */
        function Z_SHAPE_2(x, y) {
            return [
                [x, y],
                [x, y + 1],
                [x + 1, y + 1],
                [x + 1, y + 2]
            ]
        }

        /*
            2 1
          4 3
        */
        function Z_SHAPE_3(x, y) {
            return [
                [x, y],
                [x - 1, y],
                [x - 1, y + 1],
                [x - 2, y + 1]
            ]
        }

        /*
            1
          3 2
          4
        */
        function Z_SHAPE_4(x, y) {
            return [
                [x, y],
                [x, y + 1],
                [x - 1, y + 1],
                [x - 1, y + 2]
            ]
        }

        /*
            1
          2 3 4
        */
        function T_SHAPE_1(x, y) {
            return [
                [x, y],
                [x - 1, y + 1],
                [x, y + 1],
                [x + 1, y + 1]
            ]
        }

        /*
            1
          3 2
            4
        */
        function T_SHAPE_2(x, y) {
            return [
                [x, y],
                [x, y + 1],
                [x - 1, y + 1],
                [x, y + 2]
            ]
        }

        /*
          1 2 3
            4
        */
        function T_SHAPE_3(x, y) {
            return [
                [x, y],
                [x + 1, y],
                [x + 2, y],
                [x + 1, y + 1]
            ]
        }

        /*
          1
          2 3
          4
        */
        function T_SHAPE_4(x, y) {
            return [
                [x, y],
                [x, y + 1],
                [x + 1, y + 1],
                [x, y + 2]
            ]
        }
    }
    getVPID(){
        axios.get(`/api/solutionCanu/${this.props.match.params.studyid}/${
        this.props.match.params.groupid}`)
            .then(res => {
                console.log(res);
               this.setState("VP_id",res.data);
            })
            .catch(err => {
                console.log(err.response);
            });
    }

    render() {
        return (
            <div style={{height: "100%"}}>
                    <div id="congratulations-popup">
                        <h2 id="congratulations-text">Thank you!</h2>
                        <p>Since your data is completely anonymized, we have no possibility to identify your dataset.
                            If you would like to receive your scores or want us to delete your data once the study is completed, please contact <strong>canu.lfe.mw@tum.de</strong> with your request and the following identifier:</p>
                        <p id="session-id">{this.state.VP_id}</p>
                    </div>
            </div>
    );
    }
    }

    export default ThankYou;
