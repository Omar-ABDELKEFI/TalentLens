import React from 'react';
import './DisplayTests.less'
import {Button} from 'antd';
import {useDispatch} from 'react-redux';
import {actionTest}  from '@redux/actions/index';
import {Redirect} from "react-router-dom";

function DisplayTests() {
const dispatch = useDispatch()
    const handelClickCreteTest = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        dispatch(actionTest.createTest())
    }
    const token =localStorage.getItem("token")

    return (<>{!token ? <Redirect to="/403"/>:
        <div>
            <Button type="primary" onClick={handelClickCreteTest}>Create Tests</Button>
        </div>}</>
    );
}

export default DisplayTests;