import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Row, Col, Card, CardBody, Container } from 'react-bootstrap';

// Define component
export default function Calculator() {
    // Define state
    const [state, setState] = useState({
        input: '0',
        expr: '',
        output: ''
    });

    // Handle number input
    const handleNumInput = (e) => {
        const value = e.target.value;
        if (state.output !== '') {
            clearScreen();
        }
        setState((state) => {
            if (state.input.length >= 22) {
                return {
                    ...state
                }
            }
            return {
                ...state,
                input: /[+,\-,*,/]$|^0$/g.test(state.input) && !/[+,\-,*,/]-$/g.test(state.expr) ? value : state.input + value,
                expr: /0$/g.test(state.expr) && state.input === '0' ? state.expr.replace(/0$/, value) : state.expr + value
            }
        });
    }

    // Handle operator input
    const handleOperatorInput = (e) => {
        const value = e.target.value;
        setState((state) => {
            if (state.output !== '') {
                return {
                    input: value,
                    expr: state.output + value,
                    output: ''
                }
            }
            if (value === '-' && /\d[+,\-,*,/]$/g.test(state.expr)) {
                return {
                    ...state,
                    input: value,
                    expr: state.expr + value
                }
            }
            return {
                ...state,
                input: value,
                expr: /^[+,\-,*,/]$/g.test(state.input) ? state.expr.replace(/[+,\-,*,/]+$/g, value) : state.expr + value
            }
        })
    }

    // Handle decimal point input
    const handleDecimalInput = (e) => {
        const value = e.target.value;
        if (state.output !== '') {
            clearScreen();
        }
        setState((state) => {
            if (/\./g.test(state.input)) {
                return {
                    ...state
                }
            }
            if (/[+,\-,*,/]|^0$/g.test(state.input)) {
                return {
                    ...state,
                    input: '0.',
                    expr: /0$/g.test(state.expr) ? state.expr + value : state.expr + '0.'
                }
            }
            return {
                ...state,
                input: state.input + value,
                expr: state.expr + value
            }
        });
    }

    // Handle clear screen
    const clearScreen = () => {
        setState({
            input: '0',
            expr: '',
            output: ''
        });
    }

    // Handle output by evaluating expr
    const handleOutput = () => {
        let expr = state.expr.replaceAll('--', '-').replaceAll(/[+,\-,*,/]*$/g, '')
        let output = '';
        try {
            output = eval(expr);
        }
        catch (e) {
            output = 'NaN';
        }
        setState({
            input: output,
            expr: expr + ' = ' + output,
            output: output
        });
    }

    return (
        <div>
            <Card className='rounded-0' style={{ width: '300px', backgroundColor: 'lightgrey' }}>
                <CardBody className='px-1 py-0'>
                    <Row className='text-end g-1 d-flex flex-column' style={{ fontFamily: 'monospace', fontSize: 20 }}>
                        <Col>
                            <div style={{ minHeight: '30px' }}><small>{state.expr}</small></div>
                            <div id='display'>{state.input}</div>
                        </Col>
                    </Row>
                    <hr className='mb-1 mt-0' />
                    <Row className='g-1'>
                        <Col className='my-1' xs={9}><Button variant="danger" className='rounded-0 w-100 p-3' id='clear' onClick={clearScreen}>AC</Button></Col>
                        <Col className='my-1'><Button variant='secondary' className='rounded-0 w-100 p-3' id='divide' value='/' onClick={handleOperatorInput}>/</Button></Col>
                    </Row>
                    <Row className='g-1'>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='seven' value='7' onClick={handleNumInput}>7</Button></Col>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='eight' value='8' onClick={handleNumInput}>8</Button></Col>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='nine' value='9' onClick={handleNumInput}>9</Button></Col>
                        <Col className='my-1'><Button variant='secondary' className='rounded-0 w-100 p-3' id='multiply' value='*' onClick={handleOperatorInput}>x</Button></Col>
                    </Row>
                    <Row className='g-1'>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='four' value='4' onClick={handleNumInput}>4</Button></Col>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='five' value='5' onClick={handleNumInput}>5</Button></Col>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='six' value='6' onClick={handleNumInput}>6</Button></Col>
                        <Col className='my-1'><Button variant='secondary' className='rounded-0 w-100 p-3' id='subtract' value='-' onClick={handleOperatorInput}>-</Button></Col>
                    </Row>
                    <Row className='g-1'>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='one' value='1' onClick={handleNumInput}>1</Button></Col>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='two' value='2' onClick={handleNumInput}>2</Button></Col>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='three' value='3' onClick={handleNumInput}>3</Button></Col>
                        <Col className='my-1'><Button variant='secondary' className='rounded-0 w-100 p-3' id='add' value='+' onClick={handleOperatorInput}>+</Button></Col>
                    </Row>
                    <Row className='g-1'>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='decimal' value='.' onClick={handleDecimalInput}>.</Button></Col>
                        <Col className='my-1'><Button variant='dark' className='rounded-0 w-100 p-3' id='zero' value='0' onClick={handleNumInput}>0</Button></Col>
                        <Col className='my-1' xs={6}><Button variant='success' className='rounded-0 w-100 p-3' id='equals' onClick={handleOutput}>=</Button></Col>
                    </Row>
                </CardBody>
            </Card>
            <p className='text-center text-light my-2' style={{ fontSize: 16 }}>
                By <a href="https://github.com/srky420/" className='link-light text-decoration-none' style={{ fontWeight: 'bold'}}>Shahrukh</a>
            </p>
        </div>
    )
}   