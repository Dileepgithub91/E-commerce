import React, { useState, useEffect, useCallback } from 'react'
import { Button, Card, CardBody, Col, Form, FormGroup, Input, Label, Nav, NavItem, NavLink, Row, TabContent, TabPane, } from 'reactstrap'
import GSTandAddress from './gst-and-address'
import CreditAndBalance from './credit-and-balance'
import Select from "react-select"
import Flatpickr from "react-flatpickr";
import { AiFillInfoCircle } from "react-icons/ai"
import Toggle from 'react-toggle'
import { handleGstTypeDropdownRequest } from "../../../../redux/actions-reducers/ComponentProps/ComponentPropsManagement"
import { useDispatch, useSelector } from 'react-redux'
const SupplierMaster = () => {
    const dispatch = useDispatch()
    const { user_data, state_dropdown, gst_type_dropdown } = useSelector(state => state.ComponentPropsManagement)
    const [limitFlag, setLimitFlag] = useState(false)
    // const [activeTab, setActiveTab] = useState("1")

    const [partyName, setPartyName] = useState("")
    const [gstin, setGstin] = useState("")
    const [phone, setPhone] = useState("")
    const [gstType, setGstType] = useState("")
    const [state, setState] = useState("")
    const [email, setEmail] = useState("")
    const [openingBalance, setOpeningBalance] = useState("")
    const [creditLimitAmount, setCreditLimitAmount] = useState("")
    const [billingAddress, setBillingAddress] = useState("")

    // const tabArray = [
    //     {
    //         id: "1",
    //         name: "GST & Address",
    //         className: "active"
    //     },
    //     {
    //         id: "2",
    //         name: "Credit & Balance",
    //         className: "active"
    //     }
    // ]

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("saas_id", user_data.saasId)
        formData.append("party_name", partyName)
        formData.append("gstin", gstin)
        formData.append("phone_number", phone)
        formData.append("gst_type", gstType)
        formData.append("state", state)
        formData.append("email", email)
        formData.append("billing_address", billingAddress)
        formData.append("opening_balance", openingBalance)
        formData.append("credit_limit_flag", limitFlag)
        formData.append("creditLimitAmount", creditLimitAmount)
        console.log(formData)
    }


    const debounce = (func) => {
        let timer;
        return function (...args) {
            const context = this;
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                timer = null;
                func.apply(context, args);
            }, 1000);
        };
    };

    const handleFunCall = () => {
        dispatch(handleGstTypeDropdownRequest())
    }

    const optimizedFn = useCallback(debounce(handleFunCall), []);
    useEffect(() => {
        optimizedFn()
    }, [])

    return (<>
        <div className=''>
            <Card>
                <CardBody>
                    <div style={{ fontSize: "22px", fontWeight: "bold" }}>
                        Supplier
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Row className='mt-2'>
                            <Col md={3}>
                                <FormGroup>
                                    <Label>Party Name <span className="text-red"> * </span></Label>
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setPartyName(e.target.value)
                                        }}
                                        value={partyName}
                                        required={true}
                                        placeholder='Enter Party Name'
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>GSTIN <span className="text-red"> * </span></Label>
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setGstin(e.target.value)
                                        }}
                                        value={gstin}
                                        required={true}
                                        placeholder='Enter GSTIN'
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>Phone <span className="text-red"> * </span></Label>
                                    <Input
                                        type='text'
                                        onChange={e => {
                                            setPhone(e.target.value)
                                        }}
                                        value={phone}
                                        required={true}
                                        placeholder='Enter Phone'
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>Select GST Type <span className="text-red"> * </span></Label>
                                    <Select
                                        options={gst_type_dropdown}
                                        onChange={e => {
                                            setGstType(e.value)
                                        }}
                                        value={gst_type_dropdown.filter(io => io.value === gstType)}
                                        required={true}
                                        placeholder="Select Gst Type"
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>State<span className="text-red"> * </span></Label>
                                    <Select
                                        options={state_dropdown}
                                        onChange={e => {
                                            setState(e.value)
                                        }}
                                        value={state_dropdown.filter(e => e.value === state)}
                                        required={true}
                                        placeholder="Select State"
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>Email<span className="text-red"> * </span></Label>
                                    <Input
                                        type="email"
                                        onChange={e => {
                                            setEmail(e.target.value)
                                        }}
                                        value={email}
                                        required={true}
                                        placeholder="Enter Email"
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label>Opening Balance <span className="text-red"> * </span></Label>
                                    <Input
                                        type='number'
                                        required={true}
                                        onChange={e => {
                                            setOpeningBalance(e.target.value)
                                        }}
                                        value={openingBalance}
                                        placeholder="Enter Balance"
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label>Credit Limit Amount <span className="text-red"> * </span></Label>
                                    <Input
                                        type='number'
                                        onChange={e => {
                                            setCreditLimitAmount(e.target.value)
                                        }}
                                        value={creditLimitAmount}
                                        required={true}
                                        placeholder="Enter Amount"
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <FormGroup>
                                    <Label>Billing Address<span className="text-red"> * </span></Label>
                                    <Input
                                        type="textarea"
                                        onChange={e => {
                                            setBillingAddress(e.target.value)
                                        }}
                                        value={billingAddress}
                                        required={true}
                                        placeholder="Enter Address"
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <div>
                                    <span>
                                        Credit Limit
                                    </span>
                                    <span className='ms-1'>
                                        <AiFillInfoCircle color='#979797' />
                                    </span>
                                </div>
                            </Col>

                            <Col md={12} className='mt-3'>
                                <div className='d-flex flex-wrap'>
                                    <Label
                                        onClick={() => {
                                            setLimitFlag(false)
                                        }}
                                        className='mouse-pointer'
                                    >
                                        No Limit
                                    </Label>
                                    <div
                                        style={{ position: "relative", top: "1px" }}
                                    >

                                        <Toggle
                                            // defaultChecked={contentToggle}
                                            className='mx-2 '
                                            onChange={() => {
                                                setLimitFlag(!limitFlag)
                                            }}
                                            checked={limitFlag === true}
                                            icons={false}

                                        />
                                    </div>
                                    <Label
                                        onClick={() => {
                                            setLimitFlag(true)
                                        }}
                                        className='mouse-pointer'
                                    >
                                        Custom Limit
                                    </Label>
                                </div>
                            </Col>

                            <Col md={12}>
                                <div className="d-flex justify-content-end">
                                    <FormGroup>
                                        <Label>&nbsp;</Label>
                                        <div>
                                            <Button style={{ border: "none", backgroundColor: "var(--primary2)" }}>
                                                Submit
                                            </Button>
                                        </div>
                                    </FormGroup>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>

            {/* <div className='mt-4'>
                <div className='' style={{ backgroundColor: "var(--primary2)" }}>
                    <Nav tabs>
                        {tabArray.map((item, index) => {
                            return (<>
                                <NavItem style={{ backgroundColor: "var(--primary1)" }}>
                                    <NavLink
                                        style={{ color: String(index + 1) === activeTab ? "black" : "white", fontWeight: "bold" }}
                                        className={`${String(index + 1) === activeTab && "active"} mouse-pointer`}
                                        onClick={() => {
                                            setActiveTab(String(index + 1))
                                        }}
                                    >
                                        {item.name}
                                    </NavLink>
                                </NavItem>
                            </>)
                        })}
                    </Nav>
                    <TabContent activeTab={activeTab}>

                        <TabPane tabId="1">
                            <GSTandAddress />
                        </TabPane>


                        <TabPane tabId="2">
                            <CreditAndBalance />
                        </TabPane>
                    </TabContent>
                </div>
            </div> */}
        </div>
    </>)
}

export default SupplierMaster