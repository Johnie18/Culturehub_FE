"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Pencil, X } from "lucide-react";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
}

const sampleProducts: Product[] = [
  { id: "1", name: "Wireless Mouse", sku: "WM-001", price: 29.99, stock: 150, category: "Electronics" },
  { id: "2", name: "USB-C Cable", sku: "UC-002", price: 12.99, stock: 300, category: "Accessories" },
  { id: "3", name: "Laptop Stand", sku: "LS-003", price: 49.99, stock: 75, category: "Accessories" },
  { id: "4", name: "Mechanical Keyboard", sku: "MK-004", price: 129.99, stock: 45, category: "Electronics" },
  { id: "5", name: "Monitor 27 inch", sku: "MN-005", price: 299.99, stock: 30, category: "Electronics" },
  { id: "6", name: "Webcam HD", sku: "WC-006", price: 79.99, stock: 60, category: "Electronics" },
];

type EditingCell = { rowId: string; column: keyof Product } | null;

export const title = "Table with Inline Editing";

export default function TableInlineEdit01() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [editingCell, setEditingCell] = useState<EditingCell>(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (rowId: string, column: keyof Product, currentValue: string | number) => {
    setEditingCell({ rowId, column });
    setEditValue(String(currentValue));
  };

  const handleSave = (rowId: string, column: keyof Product) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === rowId) {
          const updatedProduct = { ...product };
          if (column === "price" || column === "stock") {
            updatedProduct[column] = Number(editValue);
          } else {
            updatedProduct[column] = editValue as any;
          }
          return updatedProduct;
        }
        return product;
      })
    );
    setEditingCell(null);
    setEditValue("");
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const isEditing = (rowId: string, column: keyof Product) => {
    return editingCell?.rowId === rowId && editingCell?.column === column;
  };

  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-foreground">Product Name</TableHead>
            <TableHead className="font-semibold text-foreground">SKU</TableHead>
            <TableHead className="font-semibold text-foreground">Price</TableHead>
            <TableHead className="font-semibold text-foreground">Stock</TableHead>
            <TableHead className="font-semibold text-foreground">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                {isEditing(product.id, "name") ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="h-8"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(product.id, "name");
                        if (e.key === "Escape") handleCancel();
                      }}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleSave(product.id, "name")}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="group flex items-center gap-2 cursor-pointer"
                    onDoubleClick={() => startEdit(product.id, "name", product.name)}
                  >
                    <span className="font-medium">{product.name}</span>
                    <Pencil className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </TableCell>

              <TableCell>
                {isEditing(product.id, "sku") ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="h-8 w-24"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(product.id, "sku");
                        if (e.key === "Escape") handleCancel();
                      }}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleSave(product.id, "sku")}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="group flex items-center gap-2 cursor-pointer"
                    onDoubleClick={() => startEdit(product.id, "sku", product.sku)}
                  >
                    <span className="font-mono text-muted-foreground">{product.sku}</span>
                    <Pencil className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </TableCell>

              <TableCell>
                {isEditing(product.id, "price") ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      step="0.01"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="h-8 w-24"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(product.id, "price");
                        if (e.key === "Escape") handleCancel();
                      }}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleSave(product.id, "price")}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="group flex items-center gap-2 cursor-pointer"
                    onDoubleClick={() => startEdit(product.id, "price", product.price)}
                  >
                    <span className="font-mono font-semibold">${product.price.toFixed(2)}</span>
                    <Pencil className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </TableCell>

              <TableCell>
                {isEditing(product.id, "stock") ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="h-8 w-20"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave(product.id, "stock");
                        if (e.key === "Escape") handleCancel();
                      }}
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleSave(product.id, "stock")}
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={handleCancel}
                    >
                      <X className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="group flex items-center gap-2 cursor-pointer"
                    onDoubleClick={() => startEdit(product.id, "stock", product.stock)}
                  >
                    <span className="text-muted-foreground">{product.stock}</span>
                    <Pencil className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </TableCell>

              <TableCell className="text-muted-foreground">{product.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
