import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.jsx";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.jsx";
import "./App.css";

const courts = [
  {
    id: 1,
    name: "Regent's Park Tennis Centre",
    address: "York Bridge, London NW1 4NU",
    surface: "Hard",
    price: 12,
  },
  {
    id: 2,
    name: "Hyde Park Tennis and Sports Centre",
    address: "South Carriage Drive, London W2 2UH",
    surface: "Grass",
    price: 15,
  },
  {
    id: 3,
    name: "Islington Tennis Centre",
    address: "Market Road, London N7 9PL",
    surface: "Clay",
    price: 10,
  },
];

function App() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(new Date());
  const [user, setUser] = useState(null);

  const filteredCourts = courts.filter((court) => court.address.toLowerCase().includes(location.toLowerCase()));

  const handleBook = (court) => {
    if (!user) {
      alert("Please log in to book a court");
      return;
    }

    // TODO: Implement actual booking logic
    alert(`Booked ${court.name} for ${date.toDateString()}`);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Book a Tennis Court in London</h1>

      <div className="mb-8">
        <Input type="text" placeholder="Search by location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="mb-2">Select Date:</p>
              <p>Selected Date: {date.toDateString()}</p>
            </div>
            {user ? (
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
            ) : (
              <Button onClick={() => setUser({ name: "John Doe", email: "john@example.com", avatar: "" })}>Login to Book</Button>
            )}
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Available Courts</h2>
          {filteredCourts.map((court) => (
            <Card key={court.id} className="mb-4">
              <CardHeader>
                <CardTitle>{court.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{court.address}</p>
                <div className="flex space-x-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Surface</p>
                    <p className="text-sm">{court.surface}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Price per hour</p>
                    <p className="text-sm">£{court.price}</p>
                  </div>
                </div>
                <CardFooter>
                  <Button onClick={() => handleBook(court)}>Book Now</Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
