import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, FormGroup, Input, Label, Modal, Row } from "reactstrap";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const MyCart = ({
  show,
  cartData,
  invoiceValue,
  popoverIsOpen,
  discountAmountVal,
  discountPercentVal,
  totalDiscountVal,
  setShow,
}) => {
  const {
    get_searched_data,
    cart_data,
    get_QR_img,
    total_price,
    handle_saveTransaction_data,
    get_recommended_items,
  } = useSelector((e) => e.ComponentPropsManagement);
  //   const [cartData, setCartData] = useState(null);
  return (
    <Modal
      show={cartData.lenght > 0 ? setShow(true) : setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => setShow(false)}>
        <Modal.Title id="contained-modal-title-vcenter">
          <span style={{ fontWeight: "900", marginRight: "10px" }}>
            My Basket
          </span>
          ({cartData?.length} items)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartData?.map((item) => (
          <div
            // className="cart_container"
            style={{
              display: "flex",
              flexDirection: "column",
              // padding: "10px",
              border: "1px solid #e7e7e7",
              marginBottom: "10px",
            }}
          >
            <h1>{item.itemName}</h1>
            <div className="cart_product">
              <div style={{ height: "50px" }} className="cart_column">
                <div
                  style={{
                    border: "1px solid #eee",
                    borderRadius: "20px",
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <AiOutlineMinus
                    onClick={() => {
                      handleDec(item);
                      // item.productQty = item.productQty - 1;
                      // setCartData([...cartData]);
                    }}
                  />

                  {item.productQty}
                  <AiOutlinePlus
                    onClick={() => {
                      const q = item.productQty + 1;
                      item.productQty = q;
                      const newP = item.price * q;
                      item.new_price = newP;
                      // item.price = newP
                      // console.log("ITEM", item);
                      setCartData([...cartData]);
                    }}
                  />
                </div>
              </div>
              <div style={{ flex: 1, marginLeft: "20px" }}>
                {/* {Number(item.price) * Number(item.productQty) === 0 ? (<> */}
                {/* <TextField
                label="Enter Price"
                type="number"
                onChange={e => {
                  const val = e.target.value
                  item.zero_price = val
                  setCartData([...cartData])
                }}
                value={item.zero_price}
              /> */}

                {/* <InputLabel
              >Enter Amount</InputLabel>
              <OutlinedInput
                type="number"
                size="small"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      // onClick={handleClickShowPassword}
                      edge="end"
                    >
                      <BsFillCheckCircleFill color="green" />
                    </IconButton>
                  </InputAdornment>
                }
                label="Amount"
                onChange={e => {
                  const val = e.target.value
                  item.zero_price = val
                  setCartData([...cartData])
                }}
                value={item.zero_price}
              /> */}

                {/* </>) : (<> */}
                {item.price * item.productQty}
                {/* </>)} */}
              </div>
              {/*  */}
            </div>
            {/* {item.discount ? ( */}
            {item.discount_menu_is_open ? (
              <>
                <div className="d-flex flex-sm-row">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TextField
                      label="Percent Off"
                      type="number"
                      className="me-3"
                      // ref={ref}
                      // disabled={amountOff.length > 0 ? true : false}
                      disabled={item.amount_value}
                      // value={percentOff}
                      // onChange={(e) => setPercentOff(e.target.value)}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val) {
                          if (val >= 1 && val <= 99) {
                            item.discount_value = val;
                            handleDiscount(item, val);
                          } else {
                            item.discount_value = 99;
                            handleDiscount(item, 99);
                          }
                        } else {
                          item.discount_value = "";
                          handleDiscount(item, 0);
                        }
                        // handleDiscount(item, "");
                      }}
                      value={item.discount_value}
                    />
                    <TextField
                      label="Amount Off"
                      type="number"
                      className="me-3"
                      disabled={item.discount_value}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val) {
                          if (val >= 1 && val <= 99999) {
                            item.amount_value = val;
                            handleDiscountAmount(item, val);
                          } else {
                            item.amount_value = 99999;
                            handleDiscountAmount(item, 99999);
                          }
                        } else {
                          item.amount_value = "";
                          handleDiscountAmount(item, 0);
                        }
                      }}
                      value={item.amount_value}
                      // disabled={percentOff.length > 0 ? true : false}
                      // value={amountOff}
                      // onChange={(e) => setAmountOff(e.target.value)}
                    />
                    <div>
                      <button
                        className="btn btn-danger my-3"
                        // onClick={() => handleDiscountOff(item)}
                      >
                        Apply
                      </button>
                      {/* {console.log("cartData", cartData)} */}
                      {/* <div style={{ fontSize: "10px" }}>
                    {item.discount_value || item.amount_value ? (
                      <>
                        <span
                          style={{ textDecorationLine: "line-through" }}
                        >
                          {item.price * item.productQty}
                        </span>{" "}
                        / {parseFloat(item.new_price).toFixed(2)}
                      </>
                    ) : (
                      <>{item.price * item.productQty}</>
                    )}
                  </div> */}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* <div
              style={{
                fontSize: "10px",
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "30px",
              }}
            >
              {item.discount_value || item.amount_value ? (
                <>
                  <span style={{ textDecorationLine: "line-through" }}>
                    {item.price * item.productQty}
                  </span>{" "}
                  / {parseFloat(item.new_price).toFixed(2)}
                </>
              ) : (
                <>{item.price * item.productQty}</>
              )}
            </div> */}
              </>
            )}
            {/* {console.log("ITEM", item)} */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p
                style={{
                  color: "#a90a0a",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                onClick={() => dispatch(handleDeleteCartItem(item))}
                // onClick={() => handelDeleteProduct(item)}
              >
                Remove
              </p>
              {totalDiscountVal === 0 && (
                <>
                  <p
                    style={{
                      color: "darkblue",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                    // onClick={() => {
                    //   item.discount = !item.discount;
                    //   setCartData([...cartData]);
                    //   // setDiscount((state) => !state);
                    // }}
                    onClick={() => {
                      item.discount_menu_is_open = !item.discount_menu_is_open;
                      setCartData([...cartData]);
                      // item.discount == !true ? setDiscount((state) => !state) : ""
                    }}
                    className="mx-4"
                  >
                    Discount
                  </p>
                </>
              )}
            </div>
          </div>
        ))}

        {/* <div> */}

        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Total Invoice Value: {invoiceValue}
          <br />
        </div>
        {cartData?.filter((io) => io.discount_menu_is_open === true).length ===
          0 &&
          totalDiscountVal !== 0 && (
            <>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Total Discount: {totalDiscountVal}
              </div>
            </>
          )}
        {/* </div> */}
        {cartData?.filter((io) => io.discount_menu_is_open === true).length ===
          0 && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <button
                type="button"
                style={{
                  backgroundColor: "green",
                  border: "none",
                  color: "white",
                  fontWeight: "bold",
                  padding: "6px 20px",
                  borderRadius: "10px",
                }}
                id="pop112"
                onClick={() => setPopoverIsOpen(!popoverIsOpen)}
              >
                Invoice Discount
              </button>
            </div>
          </>
        )}

        <Modal
          show={popoverIsOpen}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            onClick={() => setPopoverIsOpen(!popoverIsOpen)}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              <span style={{ fontWeight: "900", marginRight: "10px" }}>
                Invoice Discount
              </span>
              {/* ({cartData?.length} items) */}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label>
                    Percent <span className="text-red"> * </span>
                  </Label>
                  <Input
                    type="text"
                    disabled={discountAmountVal}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val) {
                        if (val >= 1 && val <= 99) {
                          setDiscountPercentVal(val);
                        } else {
                          setDiscountPercentVal(99);
                        }
                      } else {
                        setDiscountPercentVal("");
                      }
                      // handleDiscount(item, val);
                    }}
                    value={discountPercentVal}
                    placeholder="Percent Value"
                  />
                </FormGroup>
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label>
                    Amount <span className="text-red"> * </span>
                  </Label>
                  <Input
                    type="text"
                    disabled={discountPercentVal}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val) {
                        if (val >= 1 && val <= 99999) {
                          setDiscountAmountVal(val);
                        } else {
                          setDiscountAmountVal(99999);
                        }
                      } else {
                        setDiscountAmountVal("");
                      }
                      // handleDiscountAmount(item, val);
                    }}
                    value={discountAmountVal}
                    placeholder="Amount Value"
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup className="d-flex justify-content-end">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      if (discountPercentVal) {
                        handleDiscountLarge(discountPercentVal);
                        // cartData.map(item => {
                        //   item.discount_value = discountPercentVal
                        // })
                        // { console.log("cartData", cartData) }
                        // setCartData([...cartData])
                        const val1 = (sumValue * discountPercentVal) / 100;

                        setTotalDiscountVal(parseFloat(val1).toFixed(2));
                      } else if (discountAmountVal) {
                        handleDiscountAmountLarge(discountAmountVal);
                        setTotalDiscountVal(
                          parseFloat(discountAmountVal).toFixed(2)
                        );
                      } else {
                        setTotalDiscountVal(0);
                        handleDiscountAmountLarge(0);
                      }
                      setPopoverIsOpen(!popoverIsOpen);
                    }}
                  >
                    Apply
                  </button>
                </FormGroup>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        {/* <Popover placement="bottom" isOpen={popoverIsOpen} target="pop112" toggle={() => setPopoverIsOpen(!popoverIsOpen)}>
      <PopoverHeader>Invoice Discount</PopoverHeader>
      <PopoverBody>
        <div>
          <Input
            type="text"
            id="aaa"
          />
        </div>
      </PopoverBody>
    </Popover> */}
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => {
            cartData.length > 0
              ? setPaymentModal(true)
              : setPaymentModal(false);
            // setPaymentModal((state) => !state);
          }}
          style={{
            backgroundColor: "#20b9e3",
            outline: "none",
            border: "none",
            fontSize: "20px",
          }}
          // className="bg-primary"
        >
          {cartData && cartData.length > 0
            ? "Proceed to checkout"
            : "No Item here"}
          {/* Proceed to checkout */}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyCart;
