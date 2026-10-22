
function Bill({ booking, onClose }) {
    if (!booking) return null;

    return (
        <div className="bill-overlay">
            <div className="bill">
                <h2>SPARKLE CAR WASH</h2>
                <p>Service Invoice</p>
                <hr />

                <p><strong>Bill No:</strong> {booking.billNumber}</p>
                <p>
                    <strong>Date:</strong>{" "}
                    {new Date(booking.billedAt).toLocaleString()}
                </p>

                <hr />

                <p><strong>Customer:</strong> {booking.name}</p>
                <p><strong>Mobile:</strong> {booking.mobile}</p>
                <p><strong>Vehicle:</strong> {booking.vehicleNumber}</p>
                <p><strong>Vehicle Type:</strong> {booking.vehicleType}</p>

                <hr />

                <table>
                    <thead>
                    <tr>
                        <th>Service Description</th>
                        <th>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{booking.service}</td>
                        <td>₹{booking.price}</td>
                    </tr>
                    </tbody>
                </table>

                <h2>Total: ₹{booking.price}</h2>
                <p>Thank you for choosing Sparkle Car Wash!</p>

                <div className="button-row no-print">
                    <button onClick={() => window.print()}>
                        Print Bill
                    </button>
                    <button className="secondary" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Bill;
