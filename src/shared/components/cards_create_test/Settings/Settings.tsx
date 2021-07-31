import React, {ChangeEvent, useState} from 'react';
import './Settings.less'
import {Input, Radio, Space, Checkbox,Form,Button} from 'antd'
import {RadioChangeEvent} from 'antd/lib/radio/interface'
import { useDispatch, useSelector } from 'react-redux';
import {CheckboxChangeEvent} from 'antd/lib/checkbox/Checkbox'
import {actionTest} from "@redux/actions";
import {useParams} from 'react-router-dom'
function Settings() {
    const [valueSetting, setValueSetting] = useState({timing_policy:"Medium",show_score:true,name:"Custom test"})
    const {TextArea} = Input
    const dispatch=useDispatch()
    let { idTest } = useParams();
    console.log(valueSetting)
    const onHandelChangeCheck=(e:CheckboxChangeEvent) =>{
    setValueSetting({...valueSetting,[String(e.target.name)]:e.target.checked})
    }
    const onHandelChangeRadio=(e:RadioChangeEvent)=>{
        setValueSetting({...valueSetting,[String(e.target.name)]:e.target.value})
    }
    const onHandelChangeInput=(e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>)=>{
        setValueSetting({...valueSetting,[String(e.target.name)]:e.target.value})
    }
    const handleSubmit = (e: React.SyntheticEvent) => {

        dispatch(actionTest.updateTest(idTest,valueSetting))
    }
    return (
        <div>
            <Form onFinish={handleSubmit}
                labelCol={{
                    span: 4,
                }}
                colon={false}
                labelAlign="left"
>
                <Form.Item
                    label={<label style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>Name<span>*</span></label>}>
                    <Input placeholder="Name" name="name"  onChange={onHandelChangeInput} />
                </Form.Item>
                <Form.Item
                    label={<label style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>Description</label>}>
                    <Input name="description" onChange={onHandelChangeInput} />
                </Form.Item>
                <Form.Item
                    label={<label style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}} placeholder="Enter e-mail addresses of those you want to notify when a candidate finishes this test.">Notify to E-mails</label>}>
                    <TextArea onChange={onHandelChangeInput} rows={2} name="notify_emails"/>
                </Form.Item>
                <Form.Item label={<label
                    style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>Timing Policy</label>}>
                <Radio.Group onChange={onHandelChangeRadio} name="timing_policy" defaultValue={valueSetting.timing_policy}>
                    <Space direction="vertical">
                        <Radio value={"Strict"}>Srict: enforce the expacted limit</Radio>
                        <Radio value={"Medium"}>Add an extra 50% time buffer</Radio>
                        <Radio value={"Relaxed"}>Relaxed: Add an extra 200% time buffer</Radio>
                    </Space>
                </Radio.Group>
                </Form.Item>
                <Form.Item label={<label
                    style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>final Score</label>}>
                <Checkbox onChange={onHandelChangeCheck} name="show_score" checked={valueSetting.show_score}>Show to candidates</Checkbox>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Settings;