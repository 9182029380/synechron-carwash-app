
import { useState } from "react";
import { services, prices } from "../services";

function CustomerForm({ onAddBooking, onCancel }) {
    const [customer, setCustomer] = useState({
        name: "",
        mobile: "",
        vehicleNumber: "",
        vehicleType: "Hatchback",
        service: "Full Wash"
    });

    const price = prices[customer.vehicleType][customer.service];

    function handleChange(e) {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        onAddBooking({
            ...customer,
            id: Date.now(),
            price,
            status: "Booked",
            createdAt: new Date().toISOString(),
            billGenerated: false
        });
    }

    return (
        <div className="page-card">
            <h2>Customer Registration</h2>
            <p>Enter customer and vehicle details.</p>

            <form className="form" onSubmit={handleSubmit}>
                <label>Customer Name</label>
                <input
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter customer name"
                />

                <label>Mobile Number</label>
                <input
                    name="mobile"
                    type="tel"
                    value={customer.mobile}
                    onChange={handleChange}
                    required
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit mobile number"
                    placeholder="10-digit mobile number"
                />

                <label>Vehicle Number</label>
                <input
                    name="vehicleNumber"
                    value={customer.vehicleNumber}
                    onChange={handleChange}
                    required
                    placeholder="TS09AB1234"
                />

                <label>Vehicle Type</label>
                <select
                    name="vehicleType"
                    value={customer.vehicleType}
                    onChange={handleChange}
                >
                    <option>Hatchback</option>
                    <option>Sedan</option>
                    <option>SUV</option>
                    <option>Bike</option>
                </select>

                <label>Wash Service</label>
                <select
                    name="service"
                    value={customer.service}
                    onChange={handleChange}
                >
                    {services.map((service) => (
                        <option key={service.id} value={service.name}>
                            {service.name}
                        </option>
                    ))}
                </select>

                <div className="price-preview">
                    <span>Service Amount</span>
                    <strong>₹{price}</strong>
                </div>

                <div className="button-row">
                    <button type="submit">Register Customer</button>
                    <button type="button" className="secondary"
                            onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CustomerForm;
