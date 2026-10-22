
function Dashboard({ bookings }) {
    const today = new Date().toLocaleDateString();

    const todayBookings = bookings.filter(
        (b) => new Date(b.createdAt).toLocaleDateString() === today
    ).length;

    const washing = bookings.filter(
        (b) => b.status === "Washing"
    ).length;

    const completed = bookings.filter(
        (b) => b.status === "Completed" || b.status === "Billed"
    ).length;

    const revenue = bookings
        .filter((b) => b.status === "Billed")
        .reduce((total, b) => total + b.price, 0);

    const cards = [
        { title: "Total Vehicles", value: bookings.length },
        { title: "Today's Bookings", value: todayBookings },
        { title: "Currently Washing", value: washing },
        { title: "Completed Washes", value: completed },
        { title: "Total Revenue", value: `₹${revenue}` }
    ];

    return (
        <div>
            <h2>Dashboard Overview</h2>

            <div className="dashboard-grid">
                {cards.map((card) => (
                    <div className="dashboard-card" key={card.title}>
                        <p>{card.title}</p>
                        <h2>{card.value}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
