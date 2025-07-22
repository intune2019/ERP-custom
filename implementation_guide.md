# Professional Treasury & Finance Theme Implementation Guide

## Complete Implementation for ERPNext 14

### 1. File Structure Setup

Create the following directory structure in your ERPNext installation:

```
frappe-bench/
├── apps/
│   └── your_custom_app/
│       ├── your_custom_app/
│       │   ├── public/
│       │   │   ├── css/
│       │   │   │   └── professional-theme.css
│       │   │   ├── scss/
│       │   │   │   ├── professional-theme.scss
│       │   │   │   ├── _variables.scss
│       │   │   │   └── _mixins.scss
│       │   │   └── js/
│       │   │       ├── professional-theme.js
│       │   │       └── treasury-utils.js
│       │   ├── www/
│       │   │   └── (your website pages)
│       │   └── hooks.py
│       └── setup.py
```

### 2. hooks.py Configuration

```python
from . import __version__ as app_version

app_name = "your_custom_app"
app_title = "Professional Treasury Theme"
app_publisher = "Your Company"
app_description = "Professional theme for treasury and finance operations"
app_icon = "octicon octicon-graph"
app_color = "#0ea5e9"
app_email = "admin@yourcompany.com"
app_license = "MIT"

# Includes in <head>
app_include_css = [
    "/assets/your_custom_app/css/professional-theme.css"
]

app_include_js = [
    "/assets/your_custom_app/js/professional-theme.js"
]

# Website specific CSS and JS
website_context = {
    "favicon": "/assets/your_custom_app/images/favicon.ico",
    "splash_image": "/assets/your_custom_app/images/splash.png"
}

# Additional website includes
web_include_css = [
    "/assets/your_custom_app/css/professional-theme.css"
]

web_include_js = [
    "/assets/your_custom_app/js/professional-theme.js"
]

# Boot session
boot_session = "your_custom_app.boot.boot_session"

# Website Route Rules
website_route_rules = [
    {"from_route": "/treasury/<path:app_path>", "to_route": "/treasury"},
]

# Jinja Environment Customization
jenv = {
    "methods": [
        "your_custom_app.utils.get_treasury_data",
        "your_custom_app.utils.format_currency_professional"
    ]
}

# Custom Website Theme
website_theme = "professional-treasury"

# Override default web form styling
override_whitelisted_methods = {
    "your_custom_app.api.get_treasury_dashboard_data": "your_custom_app.api.get_treasury_dashboard_data"
}
```

### 3. Website Template Override

Create `templates/base.html` in your app:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}{{ title }}{% endblock %}</title>
    
    <!-- Professional Theme CSS -->
    <link rel="stylesheet" href="/assets/your_custom_app/css/professional-theme.css">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    {% block head %}{% endblock %}
</head>
<body class="professional-theme">
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="/" class="nav-brand">{{ _("Treasury Pro") }}</a>
            <ul class="nav-links">
                <li><a href="/dashboard" class="nav-link">{{ _("Dashboard") }}</a></li>
                <li><a href="/reports" class="nav-link">{{ _("Reports") }}</a></li>
                <li><a href="/treasury" class="nav-link">{{ _("Treasury") }}</a></li>
                <li><a href="/analytics" class="nav-link">{{ _("Analytics") }}</a></li>
                {% if frappe.session.user != "Guest" %}
                <li><a href="/app" class="nav-link">{{ _("App") }}</a></li>
                {% else %}
                <li><a href="/login" class="nav-link">{{ _("Login") }}</a></li>
                {% endif %}
            </ul>
        </div>
    </nav>

    <!-- Main Content -->
    <main>
        {% block content %}{% endblock %}
    </main>

    <!-- Footer with GlobalSign Badge -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>{{ _("Treasury Solutions") }}</h4>
                    <p>{{ _("Professional financial management tools designed for modern treasury operations with enterprise-grade security and compliance.") }}</p>
                </div>
                
                <div class="footer-section">
                    <h4>{{ _("Quick Links") }}</h4>
                    <p><a href="/dashboard">{{ _("Dashboard") }}</a></p>
                    <p><a href="/reports">{{ _("Reports") }}</a></p>
                    <p><a href="/api-docs">{{ _("API Documentation") }}</a></p>
                    <p><a href="/support">{{ _("Support Center") }}</a></p>
                </div>
                
                <div class="footer-section">
                    <h4>{{ _("Contact") }}</h4>
                    <p>{{ _("Email: treasury@yourcompany.com") }}</p>
                    <p>{{ _("Phone: +1 (555) 123-4567") }}</p>
                    <p>{{ _("Support: 24/7 Available") }}</p>
                </div>
                
                <div class="footer-section security-badges">
                    <h4>{{ _("Security & Compliance") }}</h4>
                    <div class="globalsign-badge" id="globalsign-real-badge">
                        <!-- Replace this div with your actual GlobalSign badge code -->
                        <div class="badge-placeholder">
                            <i class="fas fa-shield-alt"></i>
                            GlobalSign SSL
                        </div>
                        <p style="font-size: 0.875rem; margin: 0;">{{ _("Secured Connection") }}</p>
                    </div>
                    <div class="compliance-badges">
                        <p style="font-size: 0.875rem;">
                            <i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i>
                            {{ _("ISO 27001 Certified") }}
                        </p>
                        <p style="font-size: 0.875rem;">
                            <i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i>
                            {{ _("SOC 2 Type II Compliant") }}
                        </p>
                        <p style="font-size: 0.875rem;">
                            <i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i>
                            {{ _("PCI DSS Level 1") }}
                        </p>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; {{ frappe.utils.now().split('-')[0] }} {{ _("Treasury Pro. All rights reserved. | Professional Financial Management Solutions") }}</p>
            </div>
        </div>
    </footer>

    <!-- Professional Theme JavaScript -->
    <script src="/assets/your_custom_app/js/professional-theme.js"></script>
    
    {% block script %}{% endblock %}
</body>
</html>
```

### 4. GlobalSign Badge Integration

To integrate your actual GlobalSign Partner badge, replace the placeholder in the footer with your real badge code:

```html
<!-- Replace the .globalsign-badge content with your actual GlobalSign code -->
<div class="globalsign-badge" id="globalsign-real-badge">
    <!-- Your GlobalSign Partner badge script/HTML goes here -->
    <!-- Example (replace with your actual badge): -->
    <script language="javascript" type="text/javascript" src="https://seal.globalsign.com/SiteSeal/siteseal_v2.js" id="siteseal" async></script>
    
    <!-- Or for image-based badge: -->
    <!-- <a href="https://www.globalsign.com" target="_blank">
        <img src="https://seal.globalsign.com/SiteSeal/images/gs_noscript_[YOUR-SITE-SEAL-CODE].gif" 
             alt="GlobalSign SSL" 
             width="160" height="50" 
             style="border: 0;" />
    </a> -->
</div>
```

### 5. Custom Dashboard Page

Create `www/dashboard.py`:

```python
import frappe
from frappe import _

def get_context(context):
    context.show_sidebar = False
    context.title = _("Treasury Dashboard")
    
    # Get treasury data
    context.treasury_data = get_treasury_dashboard_data()
    
    return context

def get_treasury_dashboard_data():
    # Your treasury data logic here
    return {
        "total_cash": 2500000,
        "monthly_revenue": 450000,
        "pending_payments": 25,
        "risk_score": 95
    }
```

Create `www/dashboard.html`:

```html
{% extends "templates/base.html" %}

{% block title %}{{ _("Treasury Dashboard") }}{% endblock %}

{% block content %}
<div class="hero-section">
    <div class="hero-content">
        <h1>{{ _("Treasury Dashboard") }}</h1>
        <p>{{ _("Real-time financial insights and treasury management") }}</p>
    </div>
</div>

<div class="content-section">
    <div class="container">
        <div class="card-grid">
            <div class="card">
                <div class="card-icon">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <h3>{{ _("Total Cash") }}</h3>
                <p class="metric">{{ "${:,.2f}".format(treasury_data.total_cash) }}</p>
                <span class="status-indicator status-active">
                    <i class="fas fa-circle" style="font-size: 8px;"></i>
                    {{ _("Current") }}
                </span>
            </div>
            
            <div class="card">
                <div class="card-icon">
                    <i class="fas fa-chart-line"></i>
                </div>
                <h3>{{ _("Monthly Revenue") }}</h3>
                <p class="metric">{{ "${:,.2f}".format(treasury_data.monthly_revenue) }}</p>
                <span class="status-indicator status-active">
                    <i class="fas fa-arrow-up" style="font-size: 8px;"></i>
                    {{ _("Growing") }}
                </span>
            </div>
            
            <div class="card">
                <div class="card-icon">
                    <i class="fas fa-clock"></i>
                </div>
                <h3>{{ _("Pending Payments") }}</h3>
                <p class="metric">{{ treasury_data.pending_payments }}</p>
                <span class="status-indicator status-pending">
                    <i class="fas fa-circle" style="font-size: 8px;"></i>
                    {{ _("Review Required") }}
                </span>
            </div>
            
            <div class="card">
                <div class="card-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <h3>{{ _("Risk Score") }}</h3>
                <p class="metric">{{ treasury_data.risk_score }}%</p>
                <span class="status-indicator status-active">
                    <i class="fas fa-check" style="font-size: 8px;"></i>
                    {{ _("Excellent") }}
                </span>
            </div>
        </div>
    </div>
</div>
{% endblock %}

{% block script %}
<script>
$(document).ready(function() {
    // Initialize dashboard-specific features
    professional_theme.show_professional_alert('{{ _("Dashboard loaded successfully") }}', 'success', 3000);
});
</script>
{% endblock %}
```

### 6. Build and Deployment Commands

```bash
# 1. Create your custom app (if not already created)
cd frappe-bench
bench new-app your_custom_app

# 2. Install the app
bench --site your-site install-app your_custom_app

# 3. Add your theme files to the public directory
# (Copy all the SCSS, CSS, and JS files we created)

# 4. Compile SCSS to CSS
cd apps/your_custom_app
sass public/scss/professional-theme.scss:public/css/professional-theme.css --watch

# 5. Build assets
cd ../../
bench build --app your_custom_app

# 6. Clear cache
bench clear-cache
bench clear-website-cache

# 7. Restart
bench restart

# 8. For production
bench build --app your_custom_app --hard-link
bench setup nginx
sudo service nginx reload
```

### 7. Additional Professional Features

#### Custom API for Treasury Data

Create `api.py` in your app:

```python
import frappe
from frappe import _

@frappe.whitelist()
def get_treasury_dashboard_data():
    """Get real-time treasury dashboard data"""
    
    # Example queries - replace with your actual logic
    cash_accounts = frappe.get_all('Account', 
        filters={'account_type': 'Cash', 'is_group': 0},
        fields=['account_balance'])
    
    total_cash = sum([acc.account_balance or 0 for acc in cash_accounts])
    
    return {
        'total_cash': total_cash,
        'currency': frappe.defaults.get_global_default('currency'),
        'last_updated': frappe.utils.now_datetime()
    }

@frappe.whitelist()
def get_risk_metrics():
    """Calculate risk metrics for treasury operations"""
    # Your risk calculation logic here
    pass
```

#### Professional Form Styling

Add to your SCSS for enhanced form appearance:

```scss
// Professional form enhancements
.web-form {
  .form-section {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: var(--radius-xl);
    padding: var(--space-2xl);
    margin-bottom: var(--space-xl);
    box-shadow: var(--shadow-lg);
  }
  
  .form-section-heading {