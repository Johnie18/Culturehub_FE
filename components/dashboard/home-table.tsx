"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NativeSelect } from "@/components/ui/native-select";
import { useState } from "react";

type Status = "active" | "away";

interface Contact {
  id: string;
  name: string;
  role: string;
  department: string;
  status: Status;
}

const initialContacts: Contact[] = [
  { id: "1", name: "Alice Johnson", role: "Senior Developer", department: "Engineering", status: "away" },
  { id: "2", name: "Bob Smith", role: "Product Manager", department: "Product", status: "away" },
  { id: "3", name: "Carol White", role: "UX Designer", department: "Design", status: "away" },
  { id: "4", name: "David Brown", role: "DevOps Engineer", department: "Engineering", status: "away" },
  { id: "5", name: "Eve Davis", role: "Marketing Lead", department: "Marketing", status: "away" },
  { id: "6", name: "Frank Miller", role: "Data Analyst", department: "Analytics", status: "away" },
  { id: "7", name: "Grace Lee",  role: "HR Manager", department: "HR", status: "away" },
  { id: "8", name: "Henry Taylor", role: "Sales Director", department: "Sales", status: "away" },
];

// Badge display
function getStatusBadge(status: Status) {
  switch (status) {
    case "active":
      return (
        <Badge className="border-green-200 text-green-700 bg-green-100" variant="outline">
          Present
        </Badge>
      );
    case "away":
      return (
        <Badge className="border-red-200 text-red-700 bg-red-100" variant="outline">
          Not Here
        </Badge>
      );
  }
}

export default function HomeTable() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  // Update the status for one row
  const updateStatus = (id: string, newStatus: Status) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <div className="w-full space-y-4">
      <div className="border rounded-2xl shadow-sm">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-blue-100">
              <TableHead className="px-4 py-2">Name</TableHead>
              <TableHead className="px-4 py-2">Role</TableHead>
              <TableHead className="px-4 py-2">Department</TableHead>
              <TableHead className="px-4 py-2">Status</TableHead>
              <TableHead className="px-4 py-2">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {contacts.map((contact) => (
              <TableRow key={contact.id} className="hover:bg-gray-50">
                <TableCell className="px-4 py-2">{contact.name}</TableCell>
                <TableCell className="px-4 py-2">{contact.role}</TableCell>
                <TableCell className="px-4 py-2 text-muted-foreground">{contact.department}</TableCell>
                <TableCell className="px-4 py-2">{getStatusBadge(contact.status)}</TableCell>
                <TableCell className="px-4 py-2">
                  <NativeSelect
                    value={contact.status}
                    onChange={(e) => updateStatus(contact.id, e.target.value as Status)}
                    className="w-[95px]"
                  >
                    <option value="away" disabled hidden>Option</option>
                    <option value="active">Present</option>
                    <option value="away">Not Here</option>
                  </NativeSelect>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export { HomeTable };
