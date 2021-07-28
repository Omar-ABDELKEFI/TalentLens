import React, {useState} from 'react';
import './Settings.less'
import {Input, Radio, Space, Checkbox,Form} from 'antd'
import {RadioChangeEvent} from 'antd/lib/radio/interface'
import {CheckboxChangeEvent} from 'antd/lib/checkbox/Checkbox'

function Settings() {
    const [valueTiming, setValueTiming] = useState(1)
    const [showFinalScore, setShowFinalScore] = useState(1)
    const {TextArea} = Input
    const onChangeValueTiming = (e: RadioChangeEvent) => {
        console.log('radio chaked', e.target.value)
        setValueTiming(Number(e.target.value))
    }
    const onChangeFinalScore=(e:CheckboxChangeEvent)=>{
        console.log(`checked=${e.target.checked}`)
    }
    return (
        <div>
            <Form
                labelCol={{
                    span: 4,
                }}
                colon={false}
                labelAlign="left"
>
                <Form.Item
                    label={<label style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>Name<span>*</span></label>}>
                    <Input placeholder="Name" name="name"  />
                </Form.Item>
                <Form.Item
                    label={<label style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>Description</label>}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label={<label style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>Notify to E-mails</label>}>
                    <TextArea rows={2}/>
                </Form.Item>
                <Form.Item label={<label
                    style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>Timing Policy</label>}>
                <Radio.Group onChange={e => onChangeValueTiming(e)} value={valueTiming}>
                    <Space direction="vertical">
                        <Radio value={1}>Srict: enforce the expacted limit</Radio>
                        <Radio value={2}>Add an extra 50% time buffer</Radio>
                        <Radio value={3}>Relaxed: Add an extra 200% time buffer</Radio>
                    </Space>
                </Radio.Group>
                </Form.Item>
                <Form.Item label={<label
                    style={{fontSize: "16px", fontWeight: 500, color: "rgb(33,37,41)"}}>final Score</label>}>
                <Checkbox onChange={onChangeFinalScore}>Checkbox</Checkbox>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Settings;