import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserList from '../components/UserList'
function Dashboard() {
    return (
        <div>
            <header>
            <Header />
            </header>
            <main className="max-w-6xl mx-auto p-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <UserList />
            </main>
            <footer>
            <Footer />
            </footer>
        </div>
    )
}

export default Dashboard