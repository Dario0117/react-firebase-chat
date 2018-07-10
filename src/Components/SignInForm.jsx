import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';

const FormItem = Form.Item;

class ConnectForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.handleConnect({
                    email: values.email2,
                    password: values.password2,
                    roomName: values.roomName2,
                }).catch(error => {
                    message.error(error.message);
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email2', {
                        rules: [{ required: true, message: 'Please input your Email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password2', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('roomName2', {
                        rules: [{ required: true, message: 'Please input the Room name!' }],
                    })(
                        <Input prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Room name" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(ConnectForm);