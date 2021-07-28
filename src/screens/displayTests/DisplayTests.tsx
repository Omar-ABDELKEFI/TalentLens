import React, {useState} from 'react';
import './DisplayTests.less'
import {Button} from 'antd';
import service from "../../service/test-api";
import {GormDeletedAt, ModelsTestCandidate, ModelsTestQuestion} from "../../myApi";

function DisplayTests() {

    const handelClickCreteTest = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.preventDefault()
        service.myTests.myTestsCreate({
            archived: true,
            description: "string",
            name: "sdfds",
            passingScore: 5,
            showScore: false,
            timingPolicy: "Normal"
        }).then(
            (res: any) => {
                console.log(res.data)
                // localStorage.setItem('token',res.data)
            }
        )
            .catch(
                (err: any) => {
                    console.log(err)
                }
            )
    }

    return (
        <div>
            <Button type="primary" onClick={handelClickCreteTest}>Primary Button</Button>
        </div>
    );
}

export default DisplayTests;