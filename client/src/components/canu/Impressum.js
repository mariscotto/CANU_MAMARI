// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first

import "./Impressum.css";
import M from "materialize-css";

class Impressum extends React.Component {
    // storing link to tasks

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div id="impressum" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Impressum</h4>
                        </div>
                        <div className="text-container">
                            <p><strong>HERAUSGEBER</strong></p>
                            <p>Technische Universit&auml;t M&uuml;nchen</p>
                            <p>Postanschrift: Arcisstra&szlig;e 21, 80333 M&uuml;nchen</p>
                            <p>Telefon: +49-(0)89-289-01</p>
                            <p>Telefax: +49-(0)89-289-22000</p>
                            <p><strong>VERTRETUNGSBERECHTIGT</strong></p>
                            <p>Die Technische Universit&auml;t M&uuml;nchen wird gesetzlich vertreten durch den
                                Pr&auml;sidenten Prof. Dr. Thomas F. Hofmann.</p>
                            <p><strong>UMSATZSTEUERIDENTIFIKATIONSNUMMER</strong></p>
                            <p>DE811193231 (gem&auml;&szlig; &sect; 27a Umsatzsteuergesetz)</p>
                            <p><strong>VERANTWORTLICH F&Uuml;R DEN INHALT</strong></p>
                            <p>Prof. Dr. Thomas F. Hofmann</p>
                            <p>Arcisstr. 21</p>
                            <p>80333 M&uuml;nchen</p>
                            <p><strong>NUTZUNGSBEDINGUNGEN</strong></p>
                            <p>Texte, Bilder, Grafiken sowie die Gestaltung dieser Internetseiten k&ouml;nnen dem
                                Urheberrecht
                                unterliegen.</p>
                            <p>Nicht urheberrechtlich gesch&uuml;tzt sind nach &sect; 5 des Urheberrechtsgesetz
                                (UrhG)</p>
                            <p>Gesetze, Verordnungen, amtliche Erlasse und Bekanntmachungen sowie Entscheidungen und
                                amtlich verfasste
                                Leits&auml;tze zu Entscheidungen und</p>
                            <p>andere amtliche Werke, die im amtlichen Interesse zur allgemeinen Kenntnisnahme
                                ver&ouml;ffentlicht
                                worden sind, mit der Einschr&auml;nkung, dass die
                                Bestimmungen &uuml;ber &Auml;nderungsverbot und
                                Quellenangabe in &sect; 62 Abs. 1 bis 3 und &sect; 63 Abs. 1 und 2 UrhG entsprechend
                                anzuwenden
                                sind.</p>
                            <p>Als Privatperson d&uuml;rfen Sie urheberrechtlich gesch&uuml;tztes Material zum privaten
                                und sonstigen
                                eigenen Gebrauch im Rahmen des &sect; 53 UrhG verwenden. Eine Vervielf&auml;ltigung oder
                                Verwendung
                                urheberrechtlich gesch&uuml;tzten Materials dieser Seiten oder Teilen davon in anderen
                                elektronischen
                                oder gedruckten Publikationen und deren Ver&ouml;ffentlichung ist nur mit unserer
                                Einwilligung
                                gestattet. Diese Einwilligung erteilen auf Anfrage die f&uuml;r den Inhalt
                                Verantwortlichen. Der
                                Nachdruck und die Auswertung von Pressemitteilungen und Reden sind mit Quellenangabe
                                allgemein
                                gestattet.</p>
                            <p>Weiterhin k&ouml;nnen Texte, Bilder, Grafiken und sonstige Dateien ganz oder teilweise
                                dem Urheberrecht
                                Dritter unterliegen. Auch &uuml;ber das Bestehen m&ouml;glicher Rechte Dritter geben
                                Ihnen die f&uuml;r
                                den Inhalt Verantwortlichen n&auml;here Ausk&uuml;nfte.</p>
                            <p><strong>HAFTUNGSAUSSCHLUSS</strong></p>
                            <p>Alle auf dieser Internetseite bereitgestellten Informationen haben wir nach bestem Wissen
                                und Gewissen
                                erarbeitet und gepr&uuml;ft. Eine Gew&auml;hr f&uuml;r die jederzeitige Aktualit&auml;t,
                                Richtigkeit,
                                Vollst&auml;ndigkeit und Verf&uuml;gbarkeit der bereit gestellten Informationen
                                k&ouml;nnen wir
                                allerdings nicht &uuml;bernehmen. Ein Vertragsverh&auml;ltnis mit den Nutzern des
                                Internetangebots kommt
                                nicht zustande.</p>
                            <p>Wir haften nicht f&uuml;r Sch&auml;den, die durch die Nutzung dieses Internetangebots
                                entstehen. Dieser
                                Haftungsausschluss gilt nicht, soweit die Vorschriften des &sect; 839 BGB (Haftung bei
                                Amtspflichtverletzung) einschl&auml;gig sind. F&uuml;r etwaige Sch&auml;den, die beim
                                Aufrufen oder
                                Herunterladen von Daten durch Schadsoftware oder der Installation oder Nutzung von
                                Software verursacht
                                werden, &uuml;bernehmen wir keine Haftung.</p>
                            <p>Falls im Einzelfall erforderlich: Der Haftungsausschluss gilt nicht f&uuml;r
                                Informationen, die in den
                                Anwendungsbereich der Europ&auml;ischen Dienstleistungsrichtlinie (Richtlinie
                                2006/123/EG &ndash; DLRL)
                                fallen. F&uuml;r diese Informationen wird die Richtigkeit und Aktualit&auml;t
                                gew&auml;hrleistet.</p>
                            <p>Social Media: Trotz sorgf&auml;ltiger inhaltlicher Kontrolle &uuml;bernehmen wir keine
                                Haftung f&uuml;r
                                die Inhalte externer Links und Kommentare von Dritten auf allen Social Media
                                Kan&auml;len der TUM. F&uuml;r
                                den Inhalt der verlinkten Seiten sind ausschlie&szlig;lich deren Betreiberinnen und
                                Betreiber
                                verantwortlich.</p>
                            <p><strong>LINKS</strong></p>
                            <p>Von unseren eigenen Inhalten sind Querverweise (&bdquo;Links&ldquo;) auf die Webseiten
                                anderer Anbieter
                                zu unterscheiden. Durch diese Links erm&ouml;glichen wir lediglich den Zugang zur
                                Nutzung fremder
                                Inhalte nach &sect; 8 Telemediengesetz. Bei der erstmaligen Verkn&uuml;pfung mit diesen
                                Internetangeboten haben wir diese fremden Inhalte daraufhin &uuml;berpr&uuml;ft, ob
                                durch sie eine m&ouml;gliche
                                zivilrechtliche oder strafrechtliche Verantwortlichkeit ausgel&ouml;st wird. Wir
                                k&ouml;nnen diese
                                fremden Inhalte aber nicht st&auml;ndig auf Ver&auml;nderungen &uuml;berpr&uuml;fen und
                                daher auch keine
                                Verantwortung daf&uuml;r &uuml;bernehmen. F&uuml;r illegale, fehlerhafte oder
                                unvollst&auml;ndige
                                Inhalte und insbesondere f&uuml;r Sch&auml;den, die aus der Nutzung oder Nichtnutzung
                                von Informationen
                                Dritter entstehen, haftet allein der jeweilige Anbieter der Seite.</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="waves-effect waves-light btn-large modal-action modal-close">Close</a>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default Impressum;
