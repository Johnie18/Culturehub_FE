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
  name: string;
  email: string;
  department: string;
  role: string;
  status: "active" | "inactive" | "on-leave";
}

const sampleEmployees: Employee[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    department: "Engineering",
    role: "Senior Developer",
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@company.com",
    department: "Design",
    role: "UX Designer",
    status: "active",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol.williams@company.com",
    department: "Marketing",
    role: "Marketing Manager",
    status: "on-leave",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.brown@company.com",
    department: "Engineering",
    role: "DevOps Engineer",
    status: "active",
  },
  {
    id: "5",
    name: "Eve Davis",
    email: "eve.davis@company.com",
    department: "Sales",
    role: "Sales Representative",
    status: "inactive",
  },
  {
    id: "6",
    name: "Frank Miller",
    email: "frank.miller@company.com",
    department: "Engineering",
    role: "Junior Developer",
    status: "active",
  },
  {
    id: "7",
    name: "Grace Wilson",
    email: "grace.wilson@company.com",
    department: "HR",
    role: "HR Manager",
    status: "active",
  },
  {
    id: "8",
    name: "Henry Moore",
    email: "henry.moore@company.com",
    department: "Finance",
    role: "Accountant",
    status: "on-leave",
  },
  {
    id: "9",
    name: "Ivy Taylor",
    email: "ivy.taylor@company.com",
    department: "Design",
    role: "UI Designer",
    status: "active",
  },
  {
    id: "10",
    name: "Jack Anderson",
    email: "jack.anderson@company.com",
    department: "Engineering",
    role: "Tech Lead",
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
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchQuery.toLowerCase());

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
              <TableHead className="font-semibold text-foreground">Name</TableHead>
              <TableHead className="font-semibold text-foreground">Email</TableHead>
              <TableHead className="font-semibold text-foreground">Department</TableHead>
              <TableHead className="font-semibold text-foreground">Role</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
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
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {employee.email}
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {employee.role}
                  </TableCell>
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
