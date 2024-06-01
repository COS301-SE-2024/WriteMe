import Slides from "@site/src/components/Slides";
import { defaultSlides } from "@site/src/components/Slides/initSlides";
import React from "react";
import "../../css/custom.css";
// import logo from '../../../../writeme/assets/WriteMe.svg';


import "reveal.js/dist/theme/white.css";

<link rel="stylesheet" href="dist/theme/black.css"></link>

export default function DemoSlides(): JSX.Element {

    return (
        <Slides initSlides={defaultSlides}>
            <section>
                <h2>WriteMe</h2>
            </section>
            <section>
                <section>
                    <h2>Agenda</h2>
                    <ul>
                        <li className="fragment">About WriteMe</li>
                        <li className="fragment">System Requirements</li>
                        <li className="fragment">Branching Strategy</li>
                        <li className="fragment">Testing</li>
                        <li className="fragment">CI/CD</li>
                        <li className="fragment">Project Management</li>
                    </ul>
                </section>
            </section>
            <section data-background-iframe="https://docs.writeme.co.za/docs/software-requirements-specification">
                <h2>Functional Requirements</h2>
            </section>
            <section data-background-iframe="https://docs.writeme.co.za/docs/guides/branching-strategy">
                <h2>Branching Strategy</h2>
            </section>
            <section data-background-iframe="https://docs.writeme.co.za/docs/guides/testing">
                <h2>Testing</h2>
            </section>
            <section>
                <h2>CI/CD</h2>
            </section>
            <section>
                <h2>Project Management</h2>
            </section>
        </Slides>
    );
}
