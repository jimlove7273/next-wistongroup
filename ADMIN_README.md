# Admin Panel Documentation

## Overview

This admin panel provides a complete CRUD interface for managing customers, products, RMAs, and sales data. It includes authentication with automatic logout after 20 minutes of inactivity.

## Features

- Admin authentication (login/logout)
- Automatic logout after 20 minutes of inactivity
- CRUD operations for all data types
- Responsive design

## Authentication

- Login page: `/admin/login`
- Use any email ending with `@admin.com` to simulate admin access
- Password can be anything (not validated in this simulation)

## Data Management

### Customers

- List: `/admin/customers`
- Create: `/admin/customers/new`
- View: `/admin/customers/[id]`
- Edit: `/admin/customers/[id]/edit`

### Products

- List: `/admin/products`
- Create: `/admin/products/new`
- View: `/admin/products/[id]`
- Edit: `/admin/products/[id]/edit`

### RMAs

- List: `/admin/rmas`
- Create: `/admin/rmas/new`
- View: `/admin/rmas/[id]`
- Edit: `/admin/rmas/[id]/edit`

### Sales

- List: `/admin/sales`
- Create: `/admin/sales/new`
- View: `/admin/sales/[id]`
- Edit: `/admin/sales/[id]/edit`

## Implementation Notes

- All data is simulated in-memory (no database connection yet)
- To connect to Supabase, modify the `hooks/use-admin-data.ts` file
- Authentication state is managed through the `AuthProvider` component
- Automatic logout is implemented through activity monitoring in the admin layout
