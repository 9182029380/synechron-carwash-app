
import { useState } from "react";

function BookingTable({
                          bookings,
                          onUpdateStatus,
                          onGenerateBill,
                          onViewBill
                      }) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredBookings = bookings.filter((booking) => {
        const search = searchTerm.trim().toLowerCase();

        return (
            booking.mobile.toLowerCase().includes(search) ||
            booking.vehicleNumber.toLowerCase().includes(search)
        );
    });

    return (
        <div className="page-card">
            <div className="page-heading">
                <div>
                    <h1>Booking Details</h1>
                    <p>Search customers and manage vehicle wash services.</p>
                </div>

                <span>Total Bookings: {bookings.length}</span>
            </div>

            {/* Search section */}
            <div className="booking-search">
                <input
                    type="text"
                    placeholder="Search by mobile number or vehicle number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {searchTerm && (
                    <button
                        type="button"
                        className="secondary"
                        onClick={() => setSearchTerm("")}
                    >
                        Clear
                    </button>
                )}
            </div>

            <p className="search-count">
                Showing {filteredBookings.length} of {bookings.length} bookings
            </p>

            {/* Booking table */}
            <div className="table-container">
                <table>
                    <thead>
                    <tr>
                        <th>Booking ID</th>
                        <th>Customer Name</th>
                        <th>Mobile Number</th>
                        <th>Vehicle Number</th>
                        <th>Vehicle Type</th>
                        <th>Service</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                    </thead>

                    <tbody>
                    {filteredBookings.map((b) => (
                        <tr key={b.id}>
                            <td>{String(b.id).slice(-6)}</td>
                            <td>{b.name}</td>
                            <td>{b.mobile}</td>
                            <td>{b.vehicleNumber}</td>
                            <td>{b.vehicleType}</td>
                            <td>{b.service}</td>
                            <td>₹{b.price}</td>

                            <td>
                  <span className={`status ${b.status.toLowerCase()}`}>
                    {b.status}
                  </span>
                            </td>

                            <td>
                                {b.status === "Booked" && (
                                    <button onClick={() =>
                                        onUpdateStatus(b.id, "Washing")
                                    }>
                                        Start Wash
                                    </button>
                                )}

                                {b.status === "Washing" && (
                                    <button onClick={() =>
                                        onUpdateStatus(b.id, "Completed")
                                    }>
                                        Complete Wash
                                    </button>
                                )}

                                {b.status === "Completed" && (
                                    <button onClick={() =>
                                        onGenerateBill(b.id)
                                    }>
                                        Generate Bill
                                    </button>
                                )}

                                {b.status === "Billed" && (
                                    <button onClick={() => onViewBill(b)}>
                                        View Bill
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}

                    {filteredBookings.length === 0 && (
                        <tr>
                            <td colSpan="9" className="empty">
                                {bookings.length === 0
                                    ? "No bookings available. Register a customer first."
                                    : "No bookings match your search."}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BookingTable;
