"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useState } from "react";

interface Employee {
  id: string;
  date: string;
  departuretime: string;
  guest: string;
  tourguide: string;
  price: string;
  notes: string,
  status: "active" | "inactive" | "on-leave";
}

const sampleEmployees: Employee[] = [
  {
    id: "1",
    date: "Alice Johnson",
    departuretime: "alice.johnson@company.com",
    guest: "Engineering",
    tourguide: "",  
    price: "Senior Developer",
    notes: "",
    status: "active",
  },
  {
    id: "2",
    date: "Bob Smith",
    departuretime: "bob.smith@company.com",
    guest: "Design",
    tourguide: "",
    price: "UX Designer",
    notes:"",
    status: "active",
  },
  {
    id: "3",
    date: "Carol Williams",
    departuretime: "carol.williams@company.com",
    guest: "Marketing",
    tourguide: "",
    price: "Marketing Manager",
    notes: "",
    status: "on-leave",
  },
  {
    id: "4",
    date: "David Brown",
    departuretime: "david.brown@company.com",
    guest: "Engineering",
    tourguide:"",
    price: "DevOps Engineer",
    notes: "",
    status: "active",
  },
  {
    id: "5",
    date: "Eve Davis",
    departuretime: "eve.davis@company.com",
    guest: "Sales",
    tourguide: "",
    price: "Sales Representative",
    notes: "",
    status: "inactive",
  }, 
  {
    id: "6",
    date: "Frank Miller",
    departuretime: "frank.miller@company.com",
    guest: "Engineering",
    tourguide: "",
    price: "Junior Developer",
    notes: "",
    status: "active",
  },
  {
    id: "7",
    date: "Grace Wilson",
    departuretime: "grace.wilson@company.com",
    guest: "HR",
    tourguide: "",
    price: "HR Manager",
    notes: "",
    status: "active",
  },
  {
    id: "8",
    date: "Henry Moore",
    departuretime: "henry.moore@company.com",
    guest: "Finance",
    tourguide: "",
    price: "Accountant",
    notes: "",
    status: "on-leave",
  },
  {
    id: "9",
    date: "Ivy Taylor",
    departuretime: "ivy.taylor@company.com",
    guest: "Design",
    tourguide:"",
    price: "UI Designer",
    notes: "",
    status: "active",
  },
  {
    id: "10",
    date: "Jack Anderson",
    departuretime: "jack.anderson@company.com",
    guest: "Engineering",
    tourguide: "",
    price: "Tech Lead",
    notes: "",
    status: "inactive",
  },
];

function getStatusBadge(status: Employee["status"]) {
  switch (status) {
    case "active":
      return (
        <Badge className="border-green-200 text-green-700" variant="outline">
          Active
        </Badge>
      );
    case "inactive":
      return <Badge variant="secondary">Inactive</Badge>;
    case "on-leave":
      return (
        <Badge className="border-orange-200 text-orange-700" variant="outline">
          On Leave
        </Badge>
      );
  }
}

export const title = "Searchable Filterable Data Table";

export default function RouteAvailable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Employee["status"]>("all");
  const filteredEmployees = sampleEmployees.filter((employee) => {
    // Filter by status
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter;

    // Filter by search query
const matchesSearch =
  searchQuery === "" ||
  employee.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
  employee.departuretime.toLowerCase().includes(searchQuery.toLowerCase()) ||
  employee.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
  employee.tourguide.toLowerCase().includes(searchQuery.toLowerCase()) ||
  employee.price.toLowerCase().includes(searchQuery.toLowerCase());


    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, department, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as typeof statusFilter)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="on-leave">On Leave</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-foreground">Available Date</TableHead>
              <TableHead className="font-semibold text-foreground">Departure Time</TableHead>
              <TableHead className="font-semibold text-foreground">Guests</TableHead>
              <TableHead className="font-semibold text-foreground">Tour Guide</TableHead>
              <TableHead className="font-semibold text-foreground">Price</TableHead>
              <TableHead className="font-semibold text-foreground">Notes</TableHead>
              <TableHead className="font-semibold text-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Search className="mb-2 h-8 w-8" />
                    <p className="text-sm">No employees found</p>
                    <p className="text-xs">Try adjusting your search or filters</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredEmployees.map((employee) => (
                <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.date}</TableCell>
                <TableCell className="text-muted-foreground">{employee.departuretime}</TableCell>
                <TableCell>{employee.guest}</TableCell>
                <TableCell>{employee.tourguide}</TableCell>
                <TableCell>{employee.price}</TableCell>
                <TableCell>{(employee.notes)}</TableCell>
                <TableCell>{getStatusBadge(employee.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-muted-foreground">
        Showing {filteredEmployees.length} of {sampleEmployees.length} employees
      </p>
    </div>
  );
}
