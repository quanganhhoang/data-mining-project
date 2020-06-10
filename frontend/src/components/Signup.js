import React from 'react';
import { Form, Input, Button } from 'antd';
import Icon from '@ant-design/icons';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as actions from '../store/actions/auth';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onAuth(
                    values.username,
                    values.email,
                    values.password,
                    values.confirm
                );
                this.props.history.push('/dashboard');
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ 
            confirmDirty: this.state.confirmDirty || !!value 
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                
                <FormItem>
                    {getFieldDecorator('email', {
                    rules: [{
                        type: 'email', message: 'Invalid email',
                    }, {
                        required: true, message: 'Please input your email!',
                    }],
                    })(
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('password', {
                    rules: [{
                        required: true, message: 'Please input your password!',
                    }, {
                        validator: this.validateToNextPassword,
                    }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('confirm', {
                    rules: [{
                        required: true, message: 'Please confirm your password!',
                    }, {
                        validator: this.compareToFirstPassword,
                    }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Confirm password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>

                <FormItem>
                    <Button type="primary" htmlType="submit" style={{marginRight: '10px'}}>
                        SignUp
                    </Button>
                    Or 
                    <NavLink 
                        style={{marginRight: '10px'}} 
                        to='/login/'> Login
                    </NavLink>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password, confirm) => dispatch(actions.authSignup(username, email, password, confirm)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);