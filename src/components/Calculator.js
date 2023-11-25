import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Row, Col, Card, CardBody } from 'react-bootstrap';

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
            console.log(state.expr.slice(-1));
            return {
                ...state,
                input: /[+,\-,*,/]$|^0$/g.test(state.input) && !/[+,\-,*,/]-$/g.test(state.expr) ? value : state.input + value,
                expr: /0$/g.test(state.expr) ? state.expr.replace(/0$/, value) : state.expr + value
            }
        });
    }

    // Handle operator input
    const handleOperatorInput = (e) => {
        const value = e.target.value;
        setState((state) => {
            if (state.output !== '' ) {
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
                    expr: state.expr.slice(-1) === '0' ? state.expr + value : state.expr + '0.'
                }
            }
            return {
                ...state,
                input: state.input + value,
                expr: state.expr + value
            }
        });
    }

    const clearScreen = () => {
        setState({
            input: '0',
            expr: '',
            output: ''
        });
    }

    const handleOutput = () => {
        let output = '';
        try {
            output = eval(state.expr.replaceAll('--', '-'));
        }
        catch (e) {
            output = 'NaN';
        }
        setState((state) => ({
            input: output,
            expr: state.expr.replaceAll('--', '-') + ' = ' + output,
            output: output
        }));
    }

    return (
        <Card className='rounded-0' style={{ width: '300px' }}>
            <CardBody className='px-1 py-0'>
                <Row id='display' className='text-end g-1 d-flex flex-column'>
                    <Col>
                        <div className='expression' style={{ minHeight: '30px' }}><small>{state.expr}</small></div>
                        <div className='input-output'>{state.input}</div>
                    </Col>
                </Row>
                <Row className='g-1'>
                    <Col className='my-1' xs={9}><Button variant="danger" className='w-100 p-3' onClick={clearScreen}>AC</Button></Col>
                    <Col className='my-1'><Button variant='secondary' className='w-100 p-3' value='/' onClick={handleOperatorInput}>/</Button></Col>
                </Row>
                <Row className='g-1'>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='7' onClick={handleNumInput}>7</Button></Col>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='8' onClick={handleNumInput}>8</Button></Col>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='9' onClick={handleNumInput}>9</Button></Col>
                    <Col className='my-1'><Button variant='secondary' className='w-100 p-3' value='*' onClick={handleOperatorInput}>x</Button></Col>
                </Row>
                <Row className='g-1'>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='4' onClick={handleNumInput}>4</Button></Col>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='5' onClick={handleNumInput}>5</Button></Col>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='6' onClick={handleNumInput}>6</Button></Col>
                    <Col className='my-1'><Button variant='secondary' className='w-100 p-3' value='-' onClick={handleOperatorInput}>-</Button></Col>
                </Row>
                <Row className='g-1'>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='1' onClick={handleNumInput}>1</Button></Col>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='2' onClick={handleNumInput}>2</Button></Col>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='3' onClick={handleNumInput}>3</Button></Col>
                    <Col className='my-1'><Button variant='secondary' className='w-100 p-3' value='+' onClick={handleOperatorInput}>+</Button></Col>
                </Row>
                <Row className='g-1'>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='.' onClick={handleDecimalInput}>.</Button></Col>
                    <Col className='my-1'><Button variant='dark' className='w-100 p-3' value='0' onClick={handleNumInput}>0</Button></Col>
                    <Col className='my-1' xs={6}><Button variant='success' className='w-100 p-3' onClick={handleOutput}>=</Button></Col>
                </Row>
            </CardBody>
        </Card>
    )
}   