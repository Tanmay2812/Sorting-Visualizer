import React, { Component } from "react";
import './Sorting.css';
import { motion } from "framer-motion";
import selectionSort from "./algorithms/SelectionSort";
import mergeSort from "./algorithms/MergeSort";
import quickSort from "./algorithms/QuickSort";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button"
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { FaGithub } from 'react-icons/fa';
import Alert from "react-bootstrap/Alert"
import "bootstrap/dist/css/bootstrap.min.css";

const springAnim = {
    type: "spring",
    damping: 20,
    stiffness: 300
};
class Sorting extends Component {
    constructor() {
        super();
        this.state = {
            arr: [],
            method: "Algorithms",
            length: 0,
            compare: {
                i: null,
                j: null
            },
            sorted: [],
            speed: 100
        }

    }
    createArray = (e = Math.floor(window.innerWidth / 50) / 2) => {
        let arr = [];
        for (let i = 0; i < e; i++) {
            arr.push({
                value: Math.floor(Math.random() * ((window.innerHeight / 4) - 30 + 1)) + 30,
                id: "id-" + i
            })
        }
        this.setState({
            arr: arr,
            length: e,
            sorted: [],
            compare: {

            }
        })
    }
    changeArray = (e) => {
        this.createArray(e.target.value)
    }
    componentDidMount() {
        this.createArray();
        window.addEventListener("resize", (e) => {
            this.createArray();
        })
    }
    randomize = () => {
        this.createArray(this.state.length)
    }
    mergefunc = (e) => {
        e.preventDefault();
        var arr = this.state.arr;
        let length = this.state.arr.length;
        var results = []
        results = mergeSort(arr, length);
        for (let i = 0; i < results.length; i++) {
            setTimeout(() => {
                this.setState({
                    arr: results[i]
                })
            }, this.state.speed * i)
        }

    }
    quickfunc = (e) => {
        e.preventDefault();
        var arr = this.state.arr;
        let length = this.state.arr.length;
        var results = []
        results = quickSort(arr, length);
        for (let i = 0; i < results.length; i++) {
            setTimeout(() => {
                this.setState({
                    arr: results[i]
                })
            }, this.state.speed * i)
        }

    }
    selectionfunc = (e) => {
        e.preventDefault();
        var arr = this.state.arr;
        let length = this.state.arr.length;
        var results = []
        results = selectionSort(arr, length);
        for (let i = 0; i < results.length; i++) {
            setTimeout(() => {
                this.setState({
                    arr: results[i]
                })
            }, this.state.speed * i)
        }

    }
    sortFunc = (e) => {
        e.preventDefault();
        var arr = this.state.arr;
        let length = this.state.arr.length;
        var results = []
        document.getElementById('error').style = "display:none";
        if (this.state.method == "Algorithms") {
            document.getElementById('error').style = "display:block";
        }
        else {
            if (this.state.method == "Selection Sort")
                results = selectionSort(arr, length);
            else if (this.state.method == "Merge Sort")
                results = mergeSort(arr, length);
            else if (this.state.method == "Quick Sort")
                results = quickSort(arr, length);
            for (let i = 0; i < results.length; i++) {
                setTimeout(() => {
                    this.setState({
                        arr: results[i]
                    })
                }, this.state.speed * i)
            }
        }

    }
    changeSpeed = (e) => {
        this.setState({
            speed: 1100 - e.target.value
        })
    }
    render() {
        return (
            <div>
                <div>
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                            <Navbar.Brand>Sorting Visualiser</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <Button className="btn" variant="warning" onClick={this.randomize}>Randomize</Button>
                                    <NavDropdown title="Algorithms" id="collasible-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1" onClick={() => this.setState({ method: "Merge Sort" })}>Merge Sort</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2" onClick={() => this.setState({ method: "Quick Sort" })}>Quick Sort</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => this.setState({ method: "Selection Sort" })}>Selection Sort</NavDropdown.Item>
                                    </NavDropdown>

                                    <Button className="sort_btn" variant="success" type="submit" onClick={this.sortFunc}>Sorting Button</Button>{' '}
                                </Nav>
                                <Nav className="rightchange">
                                    <Form.Label className="rag">Change Size
                                        <Form.Range onChange={this.changeArray} type="range" min="2" max={Math.floor(window.screen.width / 50)} defaultValue={Math.floor((window.screen.width / 50) / 2)} id="changeSize" />
                                    </Form.Label>
                                    <Form.Label className="rag">Change Speed
                                        <Form.Range onChange={this.changeSpeed} type="range" min="100" max={1000} defaultValue={500} id="changeSize" />
                                    </Form.Label>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <div id="error" class="alert alert-danger" style={{ marginLeft: "10px", display: "none" }} role="alert">
                        Select an algorithm first!
                    </div>
                </div>
                <div className="bars" id="bars" style={{ margin: "20px" }}>
                    {
                        (this.state.arr.map((element, index) =>
                            <motion.div
                                key={element.id}
                                layout transition={springAnim}
                                className={`bar ${element.style}`}
                                id={element.id}
                                style={{ height: element.value * 3, order: index }}
                            >

                                {element.value}
                            </motion.div>

                        ))}
                </div>
                <div className="fixed-bottom">
                    <Navbar className="buttomNav" bg="danger" variant="dark">
                        <Container>
                            <p className="btmnav">&copy; Sorting Visualizer by TANMAY MALLICK
                                <a href="https://github.com/Tanmay2812/Path-Finder" className="social"><FaGithub size='1.3em' color="" /></a></p>
                        </Container>
                    </Navbar>
                </div>
            </div >
        )
    }
}
export default Sorting;