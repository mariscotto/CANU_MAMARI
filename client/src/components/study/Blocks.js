// Blocks Task Component

import React from 'react';
import Unity, { UnityContent } from "react-unity-webgl";


class Blocks extends React.Component {

    constructor(props) {
        super(props);

        // Next up create a new Unity Content object to 
        // initialise and define your WebGL build. The 
        // paths are relative from your index file.

        this.unityContent = new UnityContent(
            "/Blocks/Build.json",
            "/Blocks/UnityLoader.js"
        );

        this.unityContent.on("blocksQuitted", () => {

            // Going to New Words or next Task
            this.props.blocksFinished();
        });
    }

    render() {

        // Finally render the Unity component and pass 
        // the Unity content through the props.

        return <Unity unityContent={this.unityContent} />;

    }

}

export default Blocks;
