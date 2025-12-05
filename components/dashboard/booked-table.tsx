"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Transaction {
  id: string;
  type: "purchase" | "refund" | "subscription";
  merchant: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  description: string;
  paymentMethod: string;
  transactionId: string;
  category: string;
}

const sampleTransactions: Transaction[] = [
  {
    id: "1",
    type: "purchase",
    merchant: "Amazon",
    amount: 157.99,
    date: "2024-01-15",
    status: "completed",
    description: "Wireless mechanical keyboard with RGB backlighting and hot-swappable switches",
    paymentMethod: "Visa •••• 4242",
    transactionId: "TXN-2024-001-ABC",
    category: "Electronics",
  },
  {
    id: "2",
    type: "subscription",
    merchant: "Netflix",
    amount: 15.99,
    date: "2024-01-14",
    status: "completed",
    description: "Monthly subscription - Premium plan with 4K streaming",
    paymentMethod: "Mastercard •••• 5555",
    transactionId: "TXN-2024-002-DEF",
    category: "Entertainment",
  },
  {
    id: "3",
    type: "purchase",
    merchant: "Whole Foods",
    amount: 87.43,
    date: "2024-01-13",
    status: "completed",
    description: "Weekly grocery shopping including organic produce and essentials",
    paymentMethod: "Visa •••• 4242",
    transactionId: "TXN-2024-003-GHI",
    category: "Groceries",
  },
  {
    id: "4",
    type: "refund",
    merchant: "Best Buy",
    amount: 45.00,
    date: "2024-01-12",
    status: "pending",
    description: "Refund for returned HDMI cable that was incompatible",
    paymentMethod: "Visa •••• 4242",
    transactionId: "TXN-2024-004-JKL",
    category: "Electronics",
  },
  {
    id: "5",
    type: "purchase",
    merchant: "Uber",
    amount: 23.50,
    date: "2024-01-11",
    status: "completed",
    description: "Ride from downtown to airport terminal 2",
    paymentMethod: "Amex •••• 1234",
    transactionId: "TXN-2024-005-MNO",
    category: "Transportation",
  },
  {
    id: "6",
    type: "purchase",
    merchant: "Starbucks",
    amount: 12.75,
    date: "2024-01-10",
    status: "failed",
    description: "Morning coffee and pastry - payment declined due to insufficient funds",
    paymentMethod: "Visa •••• 4242",
    transactionId: "TXN-2024-006-PQR",
    category: "Food & Dining",
  },
];

function getTypeBadge(type: Transaction["type"]) {
  switch (type) {
    case "purchase":
      return <Badge variant="default">Purchase</Badge>;
    case "refund":
      return (
        <Badge className="border-green-200 text-green-700" variant="outline">
          Refund
        </Badge>
      );
    case "subscription":
      return (
        <Badge className="border-purple-200 text-purple-700" variant="outline">
          Subscription
        </Badge>
      );
  }
}

function getStatusBadge(status: Transaction["status"]) {
  switch (status) {
    case "completed":
      return (
        <Badge className="border-green-200 text-green-700" variant="outline">
          Completed
        </Badge>
      );
    case "pending":
      return (
        <Badge className="border-orange-200 text-orange-700" variant="outline">
          Pending
        </Badge>
      );
    case "failed":
      return (
        <Badge className="border-red-200 text-red-700" variant="outline">
          Failed
        </Badge>
      );
  }
}

export const title = "Table with Expandable Rows";

export default function TableExpandable01() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12" />
            <TableHead className="font-semibold text-foreground">Date</TableHead>
            <TableHead className="font-semibold text-foreground">Merchant</TableHead>
            <TableHead className="font-semibold text-foreground">Type</TableHead>
            <TableHead className="font-semibold text-foreground">Amount</TableHead>
            <TableHead className="font-semibold text-foreground">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleTransactions.map((transaction) => {
            const isExpanded = expandedIds.has(transaction.id);
            return [
              <TableRow key={transaction.id}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleRow(transaction.id)}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </Button>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {transaction.date}
                </TableCell>
                <TableCell className="font-medium">
                  {transaction.merchant}
                </TableCell>
                <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                <TableCell className="font-mono font-semibold">
                  {transaction.type === "refund" ? "+" : "-"}$
                  {transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              </TableRow>,
              <TableRow key={`${transaction.id}-details`} className="hover:bg-transparent">
                <TableCell colSpan={6} className="p-0">
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="border-border border-t bg-muted/30 p-4">
                      <div className="grid gap-3">
                        <div>
                          <p className="text-sm font-medium">Description</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.description}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium">Payment Method</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.paymentMethod}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Transaction ID</p>
                            <p className="font-mono text-sm text-muted-foreground">
                              {transaction.transactionId}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Category</p>
                            <Badge variant="secondary">{transaction.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ];
          })}
        </TableBody>
      </Table>
    </div>
  );
}
