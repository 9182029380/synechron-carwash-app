
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import CustomerForm from "./components/CustomerForm";
import BookingTable from "./components/BookingTable";
import Bill from "./components/Bill";
import "./App.css";

function App() {
    const [page, setPage] = useState("dashboard");
    const [bookings, setBookings] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);

    function addBooking(customer) {
        setBookings((old) => [...old, customer]);
        setPage("bookings");
    }

    function updateStatus(id, status) {
        setBookings((old) =>
            old.map((b) => b.id === id ? { ...b, status } : b)
        );
    }

    function generateBill(id) {
        const booking = bookings.find((b) => b.id === id);

        if (!booking || booking.status !== "Completed") return;

        const bill = {
            ...booking,
            status: "Billed",
            billNumber: `CW-${String(id).slice(-6)}`,
            billedAt: new Date().toISOString()
        };

        setBookings((old) =>
            old.map((b) => b.id === id ? bill : b)
        );

        setSelectedBill(bill);
    }

    return (
        <div className="app-layout">
            {/* LEFT MENU */}
            <aside className="sidebar">
                <h2>🚘 Sparkle Wash</h2>

                <button onClick={() => setPage("dashboard")}>
                    Dashboard
                </button>

                <button onClick={() => setPage("customer")}>
                    Customer Entry
                </button>

                <button onClick={() => setPage("bookings")}>
                    Booking Details
                </button>
            </aside>

            {/* ONLY ONE PAGE IS DISPLAYED HERE */}
            <main className="main-content">
                {page === "dashboard" && (
                    <Dashboard bookings={bookings} />
                )}

                {page === "customer" && (
                    <CustomerForm
                        onAddBooking={addBooking}
                        onCancel={() => setPage("dashboard")}
                    />
                )}

                {page === "bookings" && (
                    <BookingTable
                        bookings={bookings}
                        onUpdateStatus={updateStatus}
                        onGenerateBill={generateBill}
                        onViewBill={setSelectedBill}
                    />
                )}
            </main>

            {/* BILL OPENS ONLY WHEN REQUESTED */}
            {selectedBill && (
                <Bill
                    booking={selectedBill}
                    onClose={() => setSelectedBill(null)}
                />
            )}
        </div>
    );
}

export default App;
