import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';

const FormItem = Form.Item;

class SingUpForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { email, password, username: name, roomName } = values;
                this.props.handleSignUp({
                    email,
                    password,
                    name,
                    roomName,
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
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your Email!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your Username!' }],
                    })(
                        <Input prefix={<Icon type="smile-o" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('roomName', {
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

export default Form.create()(SingUpForm);