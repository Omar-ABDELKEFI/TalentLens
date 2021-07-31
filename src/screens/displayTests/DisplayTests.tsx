import React, {useState} from 'react';
import './DisplayTests.less'
import {Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {actionTest}  from '../../redux/actions/index';

function DisplayTests() {
const dispatch = useDispatch()
    const handelClickCreteTest = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        dispatch(actionTest.createTest())
    }

    return (
        <div>
            <Button type="primary" onClick={handelClickCreteTest}>Create Tests</Button>
        </div>
    );
}

export default DisplayTests;