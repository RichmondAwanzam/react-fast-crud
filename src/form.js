import { Form, Field } from 'react-final-form'
import React from 'react'
import PropTypes from 'prop-types'
import './styles.css'


const styles = {
        input: {
                padding: '3px 10px',

        }
}
const ReactSelectAdapter = ({ input, label, meta, ...rest }) => (
        <div className="row">
                <div className="col-xs-12 col-md-2 " style={{ paddingRight: '15px' }}>
                        <div className="input-labels" style={{ color: '#525050', fontSize: '15px', marginBottom: '5px' }}>{label}</div>
                </div>
                <div className="col-xs-12 col-md-8" style={{ width: '100%' }}>
                        <div style={{ width: "100%", height: '20px', marginTop: '2px' }}>
                                {meta.touched && (meta.error && <span className="input-error" style={{ color: "#c00" }}>{meta.error}</span>) || (meta.warning && <span style={{ color: "#c00" }}>{meta.warning}</span>)}
                        </div>
                </div>
        </div>
)

const FinalFormFieldSides = ({ className, customtype, position, input, label, value, id, type, meta, ...custom }) => {
        return (<div style={{ padding: '2px 0', width: '100%' }} className={`${meta.touched && meta.error ? 'has-danger' : ''}`}>


                <div className="row">
                        <div className="col-xs-12 col-md-2 " style={{ paddingRight: '15px' }}>
                                <div className="input-labels" style={{ color: '#525050', fontSize: '15px', marginBottom: '5px' }}>{label}</div>
                        </div>
                        <div className="col-xs-12 col-md-8" style={{ width: '100%' }}>
                                {type === "textarea" ?
                                        <textarea placeholder={label} className="textarea" {...input} style={meta.touched && meta.error ? { border: "1px solid #c00 !important" } : {}}></textarea>
                                        :
                                        <input className={`fast-crud-text-input ${className || ''}
                                         ${(meta.touched && meta.error) ? 'field-error' : ''}`}
                                                {...input}
                                                style={((meta.error) ? { border: "1px solid #c00!important", ...styles.input } : styles.input)}
                                                placeholder={label} type={type} />
                                }
                                <div style={{ width: "100%", height: '20px', marginTop: '2px' }}>
                                        {meta.touched && (meta.error && <span className="input-error"
                                                style={{ color: "#c00" }}>{meta.error}</span>)
                                                ||
                                                (meta.warning && <span style={{ color: "#c00" }}>{meta.warning}</span>)}
                                </div>

                        </div>
                </div>

        </div>)
}

export class MyForm extends React.Component {



        validate = (values) => {
                const props = this.props;

                const requiredFields = (props.dataField || []).filter((field) => field.isRequired);
                const errors = {};
                const required = 'Field is required';
                (requiredFields || []).forEach(value => {
                        if (!values[value.name]) {
                                errors[value.name] = required;
                        }
                });
                return errors;
        }

        static propTypes = {
                validate: PropTypes.func,
                dataFields: PropTypes.array,
                onSubmit: PropTypes.func
        }

        Condition = ({ when, is, accesskey, children }) => {
                return (
                        <Field name={when} subscription={{ value: true }}>
                                {({ input: { value } }) => {
                                        console.log("condtionvalue %%%%%%%% ", value, is, accesskey, children)
                                        return (value[accesskey] === is ? children : null)
                                }}
                        </Field>
                )
        }


        composeValidators = (validators) => value => {
                console.log('*******', validators);
                return (validators || []).reduce((error, validator) => error || validator(value), undefined);
        }

        onSubmit = (values) => {
                const props = this.props;
                if (props.onSubmit && props.onSubmit instanceof Function)
                        return props.onSubmit(values);
        }

        buildFormFields = () => {
                let Condition = this.Condition;
                const props = this.props;
                return (props.dataFields || []).map((field, i) => {

                        props.isEdit && field.hideOnEdit
                        return (props.isEdit && field.hideOnEdit) ?
                                null :
                                field.hasCondition ?
                                        <Condition when={field.when} is={field.is} accesskey={field.accesskey}>
                                                <Field key={i} type={field.type || "text"} validate={this.composeValidators(field.validateArray)} name={field.name} label={field.label}
                                                        component={field.type === "select" ? ReactSelectAdapter : FinalFormFieldSides} options={field.options} labelKey={field.labelKey}
                                                        valueKey={field.valueKey} />
                                        </Condition>
                                        :
                                        <Field key={i} type={field.type || "text"} validate={this.composeValidators(field.validateArray)} name={field.name} label={field.label}
                                                component={field.component ? field.component : field.type === "select" ? ReactSelectAdapter : FinalFormFieldSides} options={field.options} labelKey={field.labelKey}
                                                valueKey={field.valueKey} />
                })
        }


        render() {
                const props = this.props;
                return (<Form
                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        initialValues={this.props.initialValues}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                <div style={{ padding: '0 40px 20px 40px' }}>
                                        <form onSubmit={event => {

                                                const promise = handleSubmit(event);

                                                if (promise) {
                                                        promise.then(() => {
                                                                reset();
                                                        })
                                                }
                                                return promise;
                                        }}>

                                                {this.buildFormFields()}
                                                <div style={{ padding: '10px 0', borderTop: '1px solid #ccc', marginTop: '40px' }}>

                                                        <button type="submit" className="float-right  pull-right">save
                                                        </button>
                                                        {props.isEdit ?
                                                                <button type="reset" onClick={this.props.cancelEdit} className="m-btn next float-right pull-right">cancel</button>
                                                                : <button ref="reset" type="reset" onClick={reset} className="m-btn next float-right pull-right">reset</button>}
                                                        <div className="clearfix" />
                                                </div>

                                        </form>
                                </div>)}

                />)
        }
}

