import { useEffect, useState } from "react";
const defaultStepItems = [
  {
    id: 1,
    name: "Account",
    title: "Account Information",
    icon: "fa fa-lock",
    visited: false,
    details: {
      customerId: "",
      email: "",
      planName: ""
    },
    error: false
  },
  {
    id: 2,
    name: "Billing Info",
    title: "Billing Information",
    icon: "fa fa-user-circle",
    visited: false,
    details: {
      street: "",
      state: "",
      city: "",
      country: ""
    },
    error: false
  },
  {
    id: 3,
    name: "Shipping Info",
    title: "Shipping Information",
    icon: "fa fa-check-circle",
    visited: false,
    details: {
      phoneNumber: "",
      itemValue: ""
    },
    error: false
  },
  {
    id: 4,
    name: "Payment",
    title: "Payment Information",
    icon: "fa fa-money",
    visited: false,
    details: {
      card: "",
      expiry: "",
      cvv: ""
    },
    error: false
  }
];
const Checkout = () => {
  const clone = (item) => JSON.parse(JSON.stringify(item));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stepItems, setStepItems] = useState(defaultStepItems);
  const [itemNames, setItemNames] = useState([]);
  const [error, setError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleFormData = (name, evt) => {
    let draftItems = clone(stepItems);
    //const names = Object.keys(stepItems[currentIndex].details);
    draftItems[currentIndex].details[name] = evt.target.value;
    setStepItems(draftItems);
  };

  const checkInputFields = () => {
    let currentItem = stepItems[currentIndex];
    let areValid = true;
    for (let key in currentItem.details) {
      if (currentItem.details[key] === "") {
        areValid = false;
        break;
      }
    }
    if (!areValid) {
      setError(true);
      //error
      return;
    } else {
      currentItem.visited = true;
      setError(false);
      if (currentIndex === 3) {
        setShowSuccess(true);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  useEffect(() => {
    const names = Object.keys(stepItems[currentIndex].details);
    setItemNames(names);
  }, [currentIndex]);

  return (
    <div>
      <h1>Sample UI</h1>
      {error && (
        <div className="">Fill all the form fields to go to next step</div>
      )}
      <div className="d-flex justify-content-center">
        {stepItems.map((item, idx) => (
          <div
            key={item.id}
            className="ml-4"
            onClick={() => {
              if (stepItems[idx].visited) setCurrentIndex(idx);
            }}
          >
            <div className="" style={{ cursor: "pointer" }}>
              <i className={item.icon}></i>
              <div className="">{item.name}</div>
              {item.visited && <div>&#9989;</div>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        {showSuccess ? (
          <div className="">
            <h3>Success !</h3>
            <i
              class="fa fa-check"
              style={{ fontSize: "60px", color: "green" }}
            ></i>
            <div className="">You have successfully signed up</div>
          </div>
        ) : (
          <div className="">
            <div className="">
              <div className="" style={{ width: "100%" }}>
                <div className="mb-2">
                  <b>{stepItems[currentIndex].title}</b>
                </div>
                {itemNames.map((name, idx) => (
                  <div key={idx} className="mb-2">
                    <input
                      type="text"
                      placeholder={name}
                      value={stepItems[currentIndex].details[name]}
                      onChange={(evt) => handleFormData(name, evt)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-2">
              <div className="d-flex justify-content-center">
                {currentIndex !== 0 && (
                  <div className="">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setCurrentIndex(currentIndex - 1)}
                    >
                      Back
                    </button>
                  </div>
                )}
                {currentIndex === 3 ? (
                  <div className="">
                    <button
                      className="btn btn-primary ml-2"
                      onClick={() => checkInputFields()}
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <div className="ml-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => checkInputFields()}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
