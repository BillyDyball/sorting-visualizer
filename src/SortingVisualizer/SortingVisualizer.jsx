import React from 'react';
import * as sortingAlgorithms from './SortingAlgorithms/SortingAlgorithms';
import './SortingVisualizer.css';
import { Navbar, Nav, Button, Form } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

let ANIMATION_SPEED_MS = 10;

let NUMBER_OF_ARRAY_BARS = 50;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            unchangedArray: [],
            editableArray: [],
        };

        this.newArray = this.newArray.bind(this);
    }

    //after component is mounted this will run
    componentDidMount(){
        this.newArray(NUMBER_OF_ARRAY_BARS);
    }

    //generates new random data that gets displayed on screen
    newArray(value) {
        const array = [];
        for(let i = 0; i < value; i++){
            array.push(randomInt(5, 750));
        }
        this.setState({
            unchangedArray: array.slice(), 
            editableArray: array.slice()
        });
    }

    //resets array to its default values
    resetArray(){
        const array = this.state.unchangedArray.slice();
        const arrayBars = document.getElementsByClassName('bar');

        for(let i = 0; i < arrayBars.length; i++){
            let newHeight = array[i];
            arrayBars[i].style.height = `${newHeight}px`;
        }

        this.setState({
            editableArray: array
        })
    }

    //checks if new array that's been generated through a specific 
    //sorting algorithm has done so properly
    checkIfSorted(sortedArray, array){
        for(let i = 0; i < array.length; i++){
            if(sortedArray[i] !== array[i]){
                return false;
            }
        }
        return true;
    }

    mergeSort() {

        const array = this.state.editableArray.slice(),
              unpack = sortingAlgorithms.getMergeSortAnimations(array),
              animations = unpack[0],
              editableArray = unpack[1];

        this.setState({editableArray});


        for (let i = 0; i < animations.length; i++) {
            
            const arrayBars = document.getElementsByClassName('bar');
            const isColorChange = i % 3 !== 2;
            
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? "red" : null;

                setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);

            } else {

                setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);

            }
        }
        
    }
      
    bubbleSort() {
        /* I am getting a big array of all animations and what bars where involved
        I then loop through this array and do the animation based on what they specify 
        later on in the setTimeout function */
        const array = this.state.editableArray.slice(),
              unpack = sortingAlgorithms.getBubbleSortAnimations(array),
              animations = unpack[0],
              editableArray = unpack[1];

        this.setState({editableArray});

        //list of the bars the user can see on screen
        const arrayBars = document.getElementsByClassName("bar");

        for(let i = 0; i < animations.length; i++){

            let baroneID, baroneStyle, bartwoID, bartwoStyle, animationsType;

            //to save some space not all animations are 3 values long if values are not needed
            //Instead of actually swaping the bars I swap the height with whatever bar it swaped with
            if(animations[i].length > 2){
                [baroneID, bartwoID, animationsType] = animations[i];
                baroneStyle = arrayBars[baroneID].style;
                bartwoStyle = arrayBars[bartwoID].style;
            } else {
                [baroneID, animationsType] = animations[i];
                baroneStyle = arrayBars[baroneID].style;
            }

            setTimeout(() => {
                if(animationsType === "compare"){

                    baroneStyle.backgroundColor = "red";
                    bartwoStyle.backgroundColor = "red"; 

                } else if(animationsType === "stopComparing"){

                    //removing background color
                    baroneStyle.backgroundColor = null;
                    bartwoStyle.backgroundColor = null; 

                } else if (animationsType === "swap"){

                    let tempHeight = baroneStyle.height;
                    baroneStyle.height = bartwoStyle.height;
                    bartwoStyle.height = tempHeight;

                } else if(animationsType === "sorted") {
                    //Sorted
                    baroneStyle.backgroundColor = "purple";
                } else if(animationsType === "finish") {
                    //done with sorting
                    baroneStyle.backgroundColor = null;
                }
            }, i * ANIMATION_SPEED_MS);
        }
    }

    insertionSort(){
        const array = this.state.editableArray.slice(),
              unpack = sortingAlgorithms.getInsertionSortAnimations(array),
              animations = unpack[0],
              editableArray = unpack[1];

        this.setState({editableArray});

        //list of the bars the user can see on screen
        const arrayBars = document.getElementsByClassName("bar");

        for(let i = 0; i < animations.length; i++){

            let baroneID, baroneStyle, bartwoID, bartwoStyle, animationsType;

            [baroneID, bartwoID, animationsType] = animations[i];
            baroneStyle = arrayBars[baroneID].style;
            bartwoStyle = arrayBars[bartwoID].style;

            setTimeout(() => {
                if(animationsType === "compare"){

                    baroneStyle.backgroundColor = "springgreen";
                    bartwoStyle.backgroundColor = "springgreen"; 

                } else if(animationsType === "doneSwapping"){

                    //removing background color
                    baroneStyle.backgroundColor = null;
                    bartwoStyle.backgroundColor = null; 

                } else if (animationsType === "swap"){

                    let tempHeight = baroneStyle.height;
                    baroneStyle.height = bartwoStyle.height;
                    bartwoStyle.height = tempHeight;

                } else if(animationsType === "key"){

                    //baroneStyle.height = bartwoStyle.height;

                }
            }, i * ANIMATION_SPEED_MS);
        }
    }

    quickSort(){

        const array = this.state.editableArray.slice(),
              unpack = sortingAlgorithms.getQuickSortAnimations(array),
              animations = unpack[0],
              editableArray = unpack[1];

        this.setState({editableArray});

        const arrayBars = document.getElementsByClassName("bar");

        for(let i = 0; i < animations.length; i++){
            if(animations[i] !== "done"){
            
                let baroneID, baroneStyle, bartwoID, bartwoStyle, animationsType;

                [baroneID, bartwoID, animationsType] = animations[i];
                baroneStyle = arrayBars[baroneID].style;
                bartwoStyle = arrayBars[bartwoID].style;

                setTimeout(() => {
                    if(animationsType === "swap"){
                        let tempH = baroneStyle.height;
                        baroneStyle.height = bartwoStyle.height;
                        bartwoStyle.height = tempH;
                    } else if(animationsType === "pivot"){
                        //add color to new pivot and record its new position
                        baroneStyle.backgroundColor = "red";
                    } else if(animationsType === "endPivot"){
                        baroneStyle.backgroundColor = null;
                    }
                }, i * ANIMATION_SPEED_MS);
            }
        }

    }

    selectAlgorithm(){
        const algorithm = document.getElementById("algorithmSelect").value;

        if(algorithm === "mergeSort"){
            this.mergeSort();
        } else if (algorithm === "bubbleSort"){
            this.bubbleSort();
        } else if (algorithm === "insertionSort"){
            this.insertionSort();
        } else if (algorithm === "quickSort"){
            this.quickSort();
        }
    }

    //sorting algorithms need to return the actual array instead of animations for this to work
    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
          const array = [];
          const length = randomInt(1, 1000);
          for (let i = 0; i < length; i++) {
            array.push(randomInt(-1000, 1000));
          }
          const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
          
          //Change this function called based on what you want to test
          const sortedArray = sortingAlgorithms.getBubbleSortAnimations(array.slice());
          console.log(this.checkIfSorted(javaScriptSortedArray, sortedArray));
        }
    }

    render() {
        const array = this.state.unchangedArray.slice();

        //enable this button to test new algorithm
        //NOTE: sorting algorithm MUST return actual array and not animations
        //<button onClick={() => this.testSortingAlgorithms()}>Test</button>
        return (
            <div>
                <style type="text/css">
                    {`
                    .btn-outline-customGreen {
                        border: 1px #05386b solid;
                        color: #05386b;
                    }

                    .btn-outline-customGreen:hover,
                    .btn-outline-customGreen:focus {
                        outline:0;
                        background-color: #05386b;
                        color: #5cdb95;
                    }

                    .btn{
                        padding: 1em 0em 1em 0em; 
                        border-radius:.5em;
                        width:10em;
                        max-width:10em;
                        margin: 0 10px;
                        text-align: center;
                    }

                    .bg-green{
                        background-color: #5cdb95;
                    }

                    .form-group{
                        margin:0 10px
                    }


                    `}
                </style>

                <Navbar collapseOnSelect expand="lg" bg="green" variant="light">
                    <Navbar.Brand href="../../" className="mr-0 ml-4 pb-0 h2">Billy Dyball</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="col justify-content-center">
                            <Slider minValue="20" maxValue="200" parentMethod={this.newArray}></Slider>
                        </Nav>
                        
                        <Nav className="col justify-content-center">
                            <Button
                                variant="outline-customGreen" 
                                onClick={() => this.resetArray()}>Reset Array
                            </Button>
                            <Button 
                                variant="outline-customGreen" 
                                onClick={() => this.newArray(NUMBER_OF_ARRAY_BARS)}>Get New Data
                            </Button>
                        </Nav>

                        <Nav className="col justify-content-center">
                            <select name="algorithm" id="algorithmSelect">
                                <option value="undefined">Pick A Sorting Algorithm</option>
                                <option value="mergeSort">Merge Sort</option>
                                <option value="bubbleSort">Bubble Sort</option>
                                <option value="insertionSort">Insertion Sort</option>
                                <option value="quickSort">Quick Sort</option>
                            </select>

                            <Button 
                                variant="outline-customGreen" 
                                onClick={() => this.selectAlgorithm()}>Sort Data
                            </Button>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>
                
                <div className="container">
                    <div className="row justify-content-center">
                        {array.map((value, idx) => (
                            <div 
                            className="bar" 
                            key={idx}
                            style={{height: `${value}px`}}>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        )
    }
}

class Slider extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            value: 50
        }
    }
    
    map(value, low1, high1, low2, high2) {
        return parseInt(low2 + (high2 - low2) * (value - low1) / (high1 - low1));
    }

    multiFunc(evt){
        this.setState({value: evt.target.value});

        NUMBER_OF_ARRAY_BARS = evt.target.value;
        //Finds the corrisponding animaion speed compared to how many bars are on screen
        ANIMATION_SPEED_MS = this.map(NUMBER_OF_ARRAY_BARS, 10, 200, 50, 1);

        this.props.parentMethod(NUMBER_OF_ARRAY_BARS);
        //CHANGE ANIMATION SPEED
    }

    render(){
        return(
            <Form className="d-inline-block">
                <Form.Group className="d-lg-inline-block">
                    <Form.Label>
                    Array Bars & Animation Speed
                    </Form.Label>
                    <RangeSlider
                        min={10}
                        max={200}
                        value={this.state.value}
                        onChange={e => this.multiFunc(e)}
                    />
                </Form.Group>
            </Form>
        );
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}