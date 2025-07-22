# ERPNext 14 SCSS and JS Overrides Guide

## Directory Structure

Create the following directory structure in your custom app or directly in ERPNext:

```
your_app/
├── public/
│   ├── css/
│   │   └── custom.css (compiled from SCSS)
│   ├── scss/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   ├── _components.scss
│   │   └── custom.scss
│   └── js/
│       ├── custom.js
│       └── form_scripts/
│           ├── sales_invoice.js
│           └── customer.js
└── hooks.py
```

## 1. SCSS Overrides

### Main SCSS File (`public/scss/custom.scss`)

```scss
// Import Bootstrap and Frappe variables first
@import "frappe/public/scss/desk";

// Your custom variables
@import "variables";
@import "mixins";
@import "components";

// Global overrides
:root {
  --primary-color: #4f46e5;
  --secondary-color: #6b7280;
  --success-color: #10b981;
  --danger-color: #ef4444;
  --warning-color: #f59e0b;
}

// Override Frappe's default styling
.navbar {
  background: linear-gradient(135deg, var(--primary-color), #312e81) !important;
  
  .navbar-brand {
    color: white !important;
    font-weight: 600;
  }
}

// Custom form styling
.form-layout {
  .section-head {
    background: linear-gradient(90deg, #f8fafc, #e2e8f0);
    border-left: 4px solid var(--primary-color);
    padding: 12px 16px;
    margin: 16px 0 8px 0;
    border-radius: 0 4px 4px 0;
  }
}

// Custom table styling
.datatable {
  .dt-row {
    &:hover {
      background-color: #f8fafc;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      transition: all 0.2s ease;
    }
  }
  
  .dt-cell {
    border-bottom: 1px solid #e5e7eb;
    padding: 12px 8px;
    
    &.highlight {
      background-color: #fef3c7;
      font-weight: 600;
    }
  }
}

// Custom button styling
.btn {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &.btn-primary {
    background: linear-gradient(135deg, var(--primary-color), #3730a3);
    border: none;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
    }
  }
  
  &.btn-secondary {
    background: var(--secondary-color);
    color: white;
    border: none;
    
    &:hover {
      background: #4b5563;
      transform: translateY(-2px);
    }
  }
}

// Dashboard customizations
.widget {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  }
  
  .widget-head {
    background: linear-gradient(135deg, #f8fafc, #f1f5f9);
    border-radius: 12px 12px 0 0;
    padding: 16px 20px;
    border-bottom: 1px solid #e5e7eb;
  }
}

// Sidebar customizations
.desk-sidebar {
  background: #1f2937;
  
  .sidebar-item {
    color: #d1d5db;
    transition: all 0.2s ease;
    
    &:hover, &.selected {
      background: rgba(79, 70, 229, 0.2);
      color: white;
      border-left: 3px solid var(--primary-color);
    }
  }
}

// Modal customizations
.modal {
  .modal-content {
    border-radius: 16px;
    border: none;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
  
  .modal-header {
    background: linear-gradient(135deg, var(--primary-color), #312e81);
    color: white;
    border-radius: 16px 16px 0 0;
    padding: 20px 24px;
    border: none;
  }
}

// Responsive design
@media (max-width: 768px) {
  .form-layout {
    padding: 12px;
  }
  
  .widget {
    margin-bottom: 16px;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 8px;
  }
}
```

### Variables File (`public/scss/_variables.scss`)

```scss
// Brand colors
$primary: #4f46e5;
$secondary: #6b7280;
$success: #10b981;
$danger: #ef4444;
$warning: #f59e0b;
$info: #06b6d4;

// Spacing
$spacer: 1rem;
$spacers: (
  0: 0,
  1: $spacer * .25,
  2: $spacer * .5,
  3: $spacer,
  4: $spacer * 1.5,
  5: $spacer * 3,
);

// Typography
$font-family-sans-serif: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-size-base: 0.875rem;
$line-height-base: 1.5;

// Borders
$border-radius: 8px;
$border-radius-sm: 4px;
$border-radius-lg: 12px;

// Shadows
$box-shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
$box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
$box-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
```

### Components File (`public/scss/_components.scss`)

```scss
// Custom alert component
.alert-custom {
  border-radius: $border-radius;
  border: none;
  padding: 16px 20px;
  margin-bottom: 20px;
  
  &.alert-info {
    background: linear-gradient(135deg, #dbeafe, #bfdbfe);
    color: #1e40af;
  }
  
  &.alert-success {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    color: #065f46;
  }
  
  &.alert-warning {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    color: #92400e;
  }
  
  &.alert-danger {
    background: linear-gradient(135deg, #fee2e2, #fecaca);
    color: #991b1b;
  }
}

// Custom card component
.card-custom {
  background: white;
  border-radius: $border-radius-lg;
  box-shadow: $box-shadow;
  border: 1px solid #e5e7eb;
  margin-bottom: 20px;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: $box-shadow-lg;
  }
  
  .card-header {
    padding: 20px 24px 0;
    border-bottom: none;
    
    h5 {
      color: #1f2937;
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    p {
      color: #6b7280;
      font-size: 0.875rem;
      margin-bottom: 0;
    }
  }
  
  .card-body {
    padding: 20px 24px;
  }
}

// Loading spinner
.spinner-custom {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

## 2. JavaScript Overrides

### Main Custom JS (`public/js/custom.js`)

```javascript
// Global custom functions and overrides
frappe.provide('custom');

// Custom form methods
custom.setup_form = function(frm) {
    // Add custom buttons
    if (frm.doc.docstatus === 0) {
        frm.add_custom_button(__('Custom Action'), function() {
            custom.handle_custom_action(frm);
        }, __('Actions'));
    }
    
    // Custom field styling
    frm.fields_dict.custom_field && frm.fields_dict.custom_field.$wrapper.addClass('highlight-field');
    
    // Auto-refresh certain fields
    frm.doc.customer && custom.refresh_customer_details(frm);
};

custom.handle_custom_action = function(frm) {
    frappe.call({
        method: 'your_app.api.custom_method',
        args: {
            'doc': frm.doc
        },
        callback: function(r) {
            if (r.message) {
                frappe.show_alert({
                    message: __('Custom action completed successfully'),
                    indicator: 'green'
                });
                frm.reload_doc();
            }
        }
    });
};

custom.refresh_customer_details = function(frm) {
    if (frm.doc.customer) {
        frappe.db.get_value('Customer', frm.doc.customer, ['customer_group', 'territory'])
            .then(r => {
                if (r.message) {
                    frm.set_value('customer_group', r.message.customer_group);
                    frm.set_value('territory', r.message.territory);
                }
            });
    }
};

// Custom list view methods
custom.setup_listview = function(listview) {
    // Add custom buttons to list view
    listview.page.add_menu_item(__('Bulk Update'), function() {
        custom.bulk_update_dialog(listview);
    });
    
    // Custom indicators
    listview.add_indicator = function() {
        // Your custom indicator logic
    };
};

custom.bulk_update_dialog = function(listview) {
    let dialog = new frappe.ui.Dialog({
        title: __('Bulk Update'),
        fields: [
            {
                fieldtype: 'Select',
                fieldname: 'field_to_update',
                label: __('Field to Update'),
                options: ['status', 'priority', 'assigned_to']
            },
            {
                fieldtype: 'Data',
                fieldname: 'new_value',
                label: __('New Value')
            }
        ],
        primary_action: function() {
            let values = dialog.get_values();
            // Bulk update logic here
            dialog.hide();
        }
    });
    dialog.show();
};

// Override Frappe methods
frappe.ui.form.on('*', {
    setup: function(frm) {
        custom.setup_form(frm);
    }
});

// Custom dashboard methods
custom.setup_dashboard = function() {
    // Custom dashboard widgets
    frappe.dashboard.add_widget({
        name: 'custom_stats',
        label: __('Custom Statistics'),
        content: custom.get_custom_stats_html()
    });
};

custom.get_custom_stats_html = function() {
    return `
        <div class="card-custom">
            <div class="card-header">
                <h5>Monthly Overview</h5>
                <p>Key performance indicators</p>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-3 text-center">
                        <h3 class="text-primary">150</h3>
                        <p class="text-muted">New Orders</p>
                    </div>
                    <div class="col-md-3 text-center">
                        <h3 class="text-success">₹2.5L</h3>
                        <p class="text-muted">Revenue</p>
                    </div>
                    <div class="col-md-3 text-center">
                        <h3 class="text-warning">25</h3>
                        <p class="text-muted">Pending</p>
                    </div>
                    <div class="col-md-3 text-center">
                        <h3 class="text-info">95%</h3>
                        <p class="text-muted">Satisfaction</p>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Initialize on page load
$(document).ready(function() {
    // Apply custom styling
    $('body').addClass('custom-theme');
    
    // Setup dashboard if on desk
    if (frappe.boot.home_page === 'desk') {
        custom.setup_dashboard();
    }
});
```

### Form-specific Script (`public/js/form_scripts/sales_invoice.js`)

```javascript
frappe.ui.form.on('Sales Invoice', {
    refresh: function(frm) {
        // Custom button for Sales Invoice
        if (frm.doc.docstatus === 1) {
            frm.add_custom_button(__('Send WhatsApp'), function() {
                custom.send_whatsapp_invoice(frm);
            }, __('Actions'));
        }
        
        // Hide/show fields based on conditions
        frm.toggle_display('shipping_address_name', frm.doc.customer_group === 'Commercial');
        
        // Custom validation styling
        custom.highlight_required_fields(frm, ['customer', 'due_date']);
    },
    
    customer: function(frm) {
        if (frm.doc.customer) {
            // Auto-populate customer details
            frappe.call({
                method: 'erpnext.selling.doctype.sales_order.sales_order.get_customer_details',
                args: {
                    customer: frm.doc.customer,
                    company: frm.doc.company
                },
                callback: function(r) {
                    if (r.message) {
                        frm.set_value('customer_address', r.message.customer_address);
                        frm.set_value('contact_person', r.message.contact_person);
                    }
                }
            });
        }
    },
    
    before_save: function(frm) {
        // Custom validations
        if (frm.doc.grand_total > 100000 && !frm.doc.custom_approval) {
            frappe.throw(__('Approval required for invoices above ₹1,00,000'));
        }
    }
});

custom.send_whatsapp_invoice = function(frm) {
    let dialog = new frappe.ui.Dialog({
        title: __('Send Invoice via WhatsApp'),
        fields: [
            {
                fieldtype: 'Data',
                fieldname: 'phone_number',
                label: __('Phone Number'),
                reqd: 1
            },
            {
                fieldtype: 'Small Text',
                fieldname: 'message',
                label: __('Message'),
                default: `Hi ${frm.doc.customer_name}, Please find your invoice attached.`
            }
        ],
        primary_action: function() {
            let values = dialog.get_values();
            // WhatsApp integration logic here
            frappe.show_alert(__('Invoice sent via WhatsApp'));
            dialog.hide();
        }
    });
    dialog.show();
};

custom.highlight_required_fields = function(frm, fields) {
    fields.forEach(field => {
        if (!frm.doc[field]) {
            frm.fields_dict[field].$wrapper.addClass('has-error');
        } else {
            frm.fields_dict[field].$wrapper.removeClass('has-error');
        }
    });
};
```

## 3. Hooks Configuration

### hooks.py

```python
# CSS and JS files to include
app_include_css = [
    "/assets/your_app/css/custom.css"
]

app_include_js = [
    "/assets/your_app/js/custom.js"
]

# Page-specific includes
doctype_js = {
    "Sales Invoice": "public/js/form_scripts/sales_invoice.js",
    "Customer": "public/js/form_scripts/customer.js"
}

doctype_list_js = {
    "Sales Invoice": "public/js/list_scripts/sales_invoice_list.js"
}

# Custom fixtures
fixtures = [
    {
        "doctype": "Custom Field",
        "filters": [["dt", "in", ["Sales Invoice", "Customer"]]]
    }
]
```

## 4. Building and Deployment

### Build Commands

```bash
# Navigate to your app directory
cd apps/your_app

# Compile SCSS to CSS
sass public/scss/custom.scss:public/css/custom.css --watch

# Or use Frappe's build command
bench build --app your_app

# Clear cache
bench clear-cache
bench clear-website-cache
```

### Production Build

```bash
# For production, minify assets
bench build --app your_app --hard-link
```

## 5. Best Practices

1. **Namespace your CSS classes** to avoid conflicts
2. **Use CSS custom properties** for easy theming
3. **Keep JavaScript modular** with proper namespacing
4. **Test on different screen sizes** for responsiveness
5. **Use Frappe's built-in utilities** when possible
6. **Comment your code** for maintainability
7. **Version control** your customizations
8. **Test thoroughly** before deploying to production

## 6. Troubleshooting

- **Changes not reflecting**: Clear cache and hard refresh browser
- **SCSS compilation errors**: Check syntax and import paths
- **JavaScript errors**: Check browser console for detailed errors
- **Performance issues**: Minimize DOM manipulations and use efficient selectors

Remember to restart your ERPNext instance after making changes to hooks.py!