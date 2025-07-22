// Professional Treasury & Finance Theme JavaScript Enhancements
// For ERPNext 14 Website

frappe.provide('professional_theme');

professional_theme = {
    init: function() {
        this.setup_animations();
        this.setup_form_enhancements();
        this.setup_footer_badges();
        this.setup_responsive_features();
        this.setup_loading_states();
        this.setup_theme_preferences();
    },

    // Smooth animations for professional feel
    setup_animations: function() {
        // Add entrance animations to cards
        const cards = document.querySelectorAll('.card, .web-card, .widget');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            observer.observe(card);
        });

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            .animate-pulse {
                animation: pulse 2s infinite;
            }
        `;
        document.head.appendChild(style);
    },

    // Enhanced form interactions
    setup_form_enhancements: function() {
        // Add floating labels effect
        $(document).on('focus', '.form-control, input, textarea, select', function() {
            $(this).closest('.form-group').addClass('focused');
        });

        $(document).on('blur', '.form-control, input, textarea, select', function() {
            if (!$(this).val()) {
                $(this).closest('.form-group').removeClass('focused');
            }
        });

        // Enhanced validation styling
        $(document).on('invalid', '.form-control, input, textarea, select', function() {
            $(this).addClass('is-invalid');
            $(this).closest('.form-group').addClass('has-error');
        });

        $(document).on('input', '.form-control, input, textarea, select', function() {
            if (this.validity.valid) {
                $(this).removeClass('is-invalid').addClass('is-valid');
                $(this).closest('.form-group').removeClass('has-error').addClass('has-success');
            }
        });

        // Auto-format currency inputs
        $(document).on('input', 'input[data-fieldtype="Currency"], .currency-input', function() {
            let value = $(this).val().replace(/[^\d.-]/g, '');
            if (value && !isNaN(value)) {
                $(this).val(parseFloat(value).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }));
            }
        });

        // Professional form validation messages
        this.setup_custom_validation_messages();
    },

    setup_custom_validation_messages: function() {
        const customMessages = {
            required: '⚠️ This field is required for treasury compliance',
            email: '📧 Please enter a valid email address',
            number: '🔢 Please enter a valid number',
            date: '📅 Please enter a valid date',
            url: '🔗 Please enter a valid URL'
        };

        // Override default validation messages
        $(document).on('invalid', 'input, textarea, select', function(e) {
            const input = e.target;
            const validity = input.validity;
            
            if (validity.valueMissing) {
                input.setCustomValidity(customMessages.required);
            } else if (validity.typeMismatch) {
                if (input.type === 'email') {
                    input.setCustomValidity(customMessages.email);
                } else if (input.type === 'url') {
                    input.setCustomValidity(customMessages.url);
                }
            } else if (validity.patternMismatch || validity.badInput) {
                if (input.type === 'number') {
                    input.setCustomValidity(customMessages.number);
                } else if (input.type === 'date') {
                    input.setCustomValidity(customMessages.date);
                }
            }
        });

        $(document).on('input', 'input, textarea, select', function() {
            this.setCustomValidity('');
        });
    },

    // GlobalSign badge and security features
    setup_footer_badges: function() {
        // Create GlobalSign badge container if it doesn't exist
        const footer = $('.web-footer, .footer').first();
        if (footer.length && !$('.security-badges').length) {
            const securitySection = `
                <div class="footer-section security-badges">
                    <h4>Security & Compliance</h4>
                    <div class="globalsign-badge" id="globalsign-badge">
                        <div class="badge-placeholder">
                            <i class="fas fa-shield-alt"></i>
                            GlobalSign SSL
                        </div>
                        <p style="font-size: 0.875rem; margin: 0;">Secured Connection</p>
                    </div>
                    <div class="compliance-badges">
                        <p style="font-size: 0.875rem;">
                            <i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i>
                            ISO 27001 Certified
                        </p>
                        <p style="font-size: 0.875rem;">
                            <i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i>
                            SOC 2 Type II Compliant
                        </p>
                        <p style="font-size: 0.875rem;">
                            <i class="fas fa-check-circle" style="color: var(--accent-emerald);"></i>
                            PCI DSS Level 1
                        </p>
                    </div>
                </div>
            `;
            
            const footerContent = footer.find('.footer-content, .row').first();
            if (footerContent.length) {
                footerContent.append(securitySection);
            }
        }

        // Add click handler for GlobalSign badge (for your actual badge integration)
        $(document).on('click', '#globalsign-badge', function() {
            // Replace this with your actual GlobalSign badge click handler
            professional_theme.show_security_info();
        });

        // Animate security badges
        $('.compliance-badges p').each(function(index) {
            $(this).css({
                'animation': `slideInRight 0.6s ease ${index * 0.2}s forwards`,
                'opacity': '0'
            });
        });
    },

    show_security_info: function() {
        const securityModal = `
            <div class="modal fade" id="securityModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <i class="fas fa-shield-alt"></i>
                                Security & Compliance Information
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <h6><i class="fas fa-certificate text-success"></i> SSL Certificate</h6>
                                            <p>GlobalSign Extended Validation SSL Certificate ensures all data transmission is encrypted and secure.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <h6><i class="fas fa-award text-primary"></i> ISO 27001</h6>
                                            <p>Information Security Management System certified to international standards.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <h6><i class="fas fa-eye text-info"></i> SOC 2 Type II</h6>
                                            <p>Annual third-party audit of security controls and procedures.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card">
                                        <div class="card-body">
                                            <h6><i class="fas fa-credit-card text-warning"></i> PCI DSS</h6>
                                            <p>Level 1 compliance for secure payment card data handling.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <a href="#" class="btn btn-primary">View Certificates</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        if (!$('#securityModal').length) {
            $('body').append(securityModal);
        }
        $('#securityModal').modal('show');
    },

    // Responsive features and mobile optimizations
    setup_responsive_features: function() {
        // Mobile navigation toggle
        const navToggle = `
            <button class="navbar-toggler d-lg-none" type="button" id="navToggle">
                <span class="navbar-toggler-icon"></span>
            </button>
        `;
        
        $('.navbar .nav-container').append(navToggle);
        
        $(document).on('click', '#navToggle', function() {
            $('.nav-links').toggleClass('show');
        });

        // Touch-friendly interactions for mobile
        if ('ontouchstart' in window) {
            $('.card, .btn').addClass('touch-friendly');
            
            const touchStyles = `
                .touch-friendly:hover {
                    transform: none !important;
                }
                .touch-friendly:active {
                    transform: scale(0.98) !important;
                    transition: transform 0.1s ease !important;
                }
            `;
            
            $('<style>').prop('type', 'text/css').html(touchStyles).appendTo('head');
        }

        // Responsive table scrolling
        $('.table-responsive').each(function() {
            if ($(this).find('table').width() > $(this).width()) {
                $(this).addClass('has-scroll');
            }
        });
    },

    // Professional loading states
    setup_loading_states: function() {
        // Global loading indicator
        const loadingHtml = `
            <div id="global-loader" class="global-loader">
                <div class="loader-content">
                    <div class="spinner-custom"></div>
                    <p>Loading Treasury Data...</p>
                </div>
            </div>
        `;
        
        if (!$('#global-loader').length) {
            $('body').append(loadingHtml);
        }

        const loaderStyles = `
            .global-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                z-index: 9999;
                display: none;
                justify-content: center;
                align-items: center;
            }
            
            .loader-content {
                text-align: center;
                color: var(--primary-600);
            }
            
            .spinner-custom {
                width: 40px;
                height: 40px;
                border: 3px solid var(--primary-200);
                border-top: 3px solid var(--accent-blue);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
        `;
        
        $('<style>').prop('type', 'text/css').html(loaderStyles).appendTo('head');

        // Show loader on form submissions
        $(document).on('submit', 'form', function() {
            professional_theme.show_loader();
        });

        // Hide loader when page loads
        $(window).on('load', function() {
            professional_theme.hide_loader();
        });
    },

    show_loader: function() {
        $('#global-loader').css('display', 'flex');
    },

    hide_loader: function() {
        $('#global-loader').fadeOut(300);
    },

    // Theme preferences and customization
    setup_theme_preferences: function() {
        // Add theme customizer panel
        const customizerHtml = `
            <div id="theme-customizer" class="theme-customizer">
                <button class="customizer-toggle" id="customizerToggle">
                    <i class="fas fa-palette"></i>
                </button>
                <div class="customizer-panel">
                    <h6>Theme Settings</h6>
                    <div class="form-group">
                        <label>Primary Color</label>
                        <input type="color" id="primaryColor" value="#0ea5e9" class="form-control">
                    </div>
                    <div class="form-group">
                        <label>Font Size</label>
                        <select id="fontSize" class="form-control">
                            <option value="small">Small</option>
                            <option value="medium" selected>Medium</option>
                            <option value="large">Large</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="darkMode"> Dark Mode
                        </label>
                    </div>
                    <button class="btn btn-primary btn-sm" id="resetTheme">Reset</button>
                </div>
            </div>
        `;
        
        if (!$('#theme-customizer').length) {
            $('body').append(customizerHtml);
        }

        const customizerStyles = `
            .theme-customizer {
                position: fixed;
                top: 50%;
                right: -250px;
                width: 280px;
                transform: translateY(-50%);
                transition: right 0.3s ease;
                z-index: 1000;
            }
            
            .theme-customizer.open {
                right: 0;
            }
            
            .customizer-toggle {
                position: absolute;
                left: -50px;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background: var(--accent-blue);
                color: white;
                border: none;
                border-radius: 10px 0 0 10px;
                cursor: pointer;
                box-shadow: var(--shadow-lg);
            }
            
            .customizer-panel {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid var(--primary-200);
                border-radius: var(--radius-lg);
                padding: var(--space-xl);
                box-shadow: var(--shadow-xl);
            }
            
            .customizer-panel h6 {
                margin-bottom: var(--space-lg);
                color: var(--primary-800);
                font-weight: 600;
            }
            
            .customizer-panel .form-group {
                margin-bottom: var(--space-md);
            }
            
            .customizer-panel label {
                font-size: 0.875rem;
                color: var(--primary-600);
                font-weight: 500;
            }
        `;
        
        $('<style>').prop('type', 'text/css').html(customizerStyles).appendTo('head');

        // Customizer toggle functionality
        $(document).on('click', '#customizerToggle', function() {
            $('#theme-customizer').toggleClass('open');
        });

        // Theme preference handlers
        $(document).on('change', '#primaryColor', function() {
            const color = $(this).val();
            document.documentElement.style.setProperty('--accent-blue', color);
            localStorage.setItem('theme-primary-color', color);
        });

        $(document).on('change', '#fontSize', function() {
            const size = $(this).val();
            const sizes = {
                small: '14px',
                medium: '16px',
                large: '18px'
            };
            document.documentElement.style.setProperty('--font-size-base', sizes[size]);
            localStorage.setItem('theme-font-size', size);
        });

        $(document).on('change', '#darkMode', function() {
            const isDark = $(this).is(':checked');
            $('body').toggleClass('dark-mode', isDark);
            localStorage.setItem('theme-dark-mode', isDark);
        });

        $(document).on('click', '#resetTheme', function() {
            localStorage.removeItem('theme-primary-color');
            localStorage.removeItem('theme-font-size');
            localStorage.removeItem('theme-dark-mode');
            location.reload();
        });

        // Load saved preferences
        this.load_theme_preferences();
    },

    load_theme_preferences: function() {
        const savedColor = localStorage.getItem('theme-primary-color');
        const savedFontSize = localStorage.getItem('theme-font-size');
        const savedDarkMode = localStorage.getItem('theme-dark-mode');

        if (savedColor) {
            document.documentElement.style.setProperty('--accent-blue', savedColor);
            $('#primaryColor').val(savedColor);
        }

        if (savedFontSize) {
            const sizes = {
                small: '14px',
                medium: '16px',
                large: '18px'
            };
            document.documentElement.style.setProperty('--font-size-base', sizes[savedFontSize]);
            $('#fontSize').val(savedFontSize);
        }

        if (savedDarkMode === 'true') {
            $('body').addClass('dark-mode');
            $('#darkMode').prop('checked', true);
        }
    },

    // Professional notifications and alerts
    show_professional_alert: function(message, type = 'info', duration = 5000) {
        const alertId = 'alert-' + Date.now();
        const icons = {
            success: 'fas fa-check-circle',
            warning: 'fas fa-exclamation-triangle',
            error: 'fas fa-times-circle',
            info: 'fas fa-info-circle'
        };

        const alertHtml = `
            <div class="professional-alert alert-${type}" id="${alertId}">
                <div class="alert-content">
                    <i class="${icons[type]}"></i>
                    <span class="alert-message">${message}</span>
                    <button class="alert-close" data-alert="${alertId}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;

        if (!$('#professional-alerts').length) {
            const alertContainer = `
                <div id="professional-alerts" class="professional-alerts-container"></div>
            `;
            $('body').append(alertContainer);

            const alertStyles = `
                .professional-alerts-container {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    max-width: 400px;
                }
                
                .professional-alert {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    border-radius: var(--radius-lg);
                    box-shadow: var(--shadow-xl);
                    margin-bottom: var(--space-md);
                    animation: slideInRight 0.3s ease;
                    border-left: 4px solid;
                }
                
                .professional-alert.alert-success {
                    border-left-color: var(--success);
                }
                
                .professional-alert.alert-warning {
                    border-left-color: var(--warning);
                }
                
                .professional-alert.alert-error {
                    border-left-color: var(--error);
                }
                
                .professional-alert.alert-info {
                    border-left-color: var(--info);
                }
                
                .alert-content {
                    display: flex;
                    align-items: center;
                    gap: var(--space-md);
                    padding: var(--space-lg);
                }
                
                .alert-content i:first-child {
                    font-size: 1.25rem;
                    color: var(--primary-600);
                }
                
                .alert-message {
                    flex: 1;
                    color: var(--primary-800);
                    font-weight: 500;
                }
                
                .alert-close {
                    background: none;
                    border: none;
                    color: var(--primary-400);
                    cursor: pointer;
                    padding: var(--space-xs);
                    border-radius: var(--radius-sm);
                    transition: all 0.2s ease;
                }
                
                .alert-close:hover {
                    background: var(--primary-100);
                    color: var(--primary-600);
                }
                
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes slideOutRight {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                }
            `;
            
            $('<style>').prop('type', 'text/css').html(alertStyles).appendTo('head');
        }

        $('#professional-alerts').append(alertHtml);

        // Auto-dismiss after duration
        if (duration > 0) {
            setTimeout(() => {
                this.dismiss_alert(alertId);
            }, duration);
        }

        // Close button handler
        $(document).on('click', '.alert-close', function() {
            const alertId = $(this).data('alert');
            professional_theme.dismiss_alert(alertId);
        });
    },

    dismiss_alert: function(alertId) {
        const alert = $('#' + alertId);
        alert.css('animation', 'slideOutRight 0.3s ease');
        setTimeout(() => {
            alert.remove();
        }, 300);
    },

    // Enhanced table features
    setup_enhanced_tables: function() {
        // Add sorting indicators
        $('.table th').each(function() {
            if ($(this).data('sortable') !== false) {
                $(this).addClass('sortable').append('<i class="sort-icon fas fa-sort"></i>');
            }
        });

        // Table search functionality
        $('.table-container').each(function() {
            if (!$(this).find('.table-search').length) {
                const searchHtml = `
                    <div class="table-controls">
                        <div class="table-search">
                            <input type="text" placeholder="Search table..." class="form-control">
                            <i class="fas fa-search"></i>
                        </div>
                        <div class="table-actions">
                            <button class="btn btn-secondary btn-sm" data-action="export">
                                <i class="fas fa-download"></i> Export
                            </button>
                        </div>
                    </div>
                `;
                $(this).prepend(searchHtml);
            }
        });

        // Table search handler
        $(document).on('input', '.table-search input', function() {
            const searchTerm = $(this).val().toLowerCase();
            const table = $(this).closest('.table-container').find('table');
            
            table.find('tbody tr').each(function() {
                const rowText = $(this).text().toLowerCase();
                $(this).toggle(rowText.includes(searchTerm));
            });
        });

        // Export functionality
        $(document).on('click', '[data-action="export"]', function() {
            const table = $(this).closest('.table-container').find('table');
            professional_theme.export_table_to_csv(table);
        });
    },

    export_table_to_csv: function(table) {
        const rows = [];
        table.find('tr').each(function() {
            const row = [];
            $(this).find('th, td').each(function() {
                row.push($(this).text().trim());
            });
            rows.push(row.join(','));
        });

        const csvContent = rows.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'treasury-data-' + new Date().toISOString().split('T')[0] + '.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        this.show_professional_alert('Table exported successfully!', 'success');
    },

    // Financial data formatting
    format_currency: function(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        }).format(amount);
    },

    format_percentage: function(value, decimals = 2) {
        return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value / 100);
    },

    // Treasury-specific utilities
    calculate_compound_interest: function(principal, rate, time, compound_frequency = 12) {
        const amount = principal * Math.pow((1 + (rate / compound_frequency)), (compound_frequency * time));
        return amount - principal;
    },

    // Professional keyboard shortcuts
    setup_keyboard_shortcuts: function() {
        $(document).on('keydown', function(e) {
            // Ctrl/Cmd + S for save
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                const saveBtn = $('.btn-primary:contains("Save")').first();
                if (saveBtn.length) {
                    saveBtn.click();
                    professional_theme.show_professional_alert('Save shortcut activated', 'info', 2000);
                }
            }

            // Ctrl/Cmd + E for export
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                const exportBtn = $('[data-action="export"]').first();
                if (exportBtn.length) {
                    exportBtn.click();
                }
            }

            // Escape to close modals
            if (e.key === 'Escape') {
                $('.modal.show').modal('hide');
                $('#theme-customizer').removeClass('open');
            }
        });
    },

    // Performance monitoring
    setup_performance_monitoring: function() {
        // Monitor page load performance
        window.addEventListener('load', function() {
            setTimeout(() => {
                const performance = window.performance;
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                
                if (loadTime > 3000) {
                    console.warn('Page load time is slow:', loadTime + 'ms');
                }
                
                // Log to analytics if available
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'page_load_time', {
                        'event_category': 'Performance',
                        'value': loadTime
                    });
                }
            }, 1000);
        });
    }
};

// Initialize theme when document is ready
$(document).ready(function() {
    professional_theme.init();
    professional_theme.setup_enhanced_tables();
    professional_theme.setup_keyboard_shortcuts();
    professional_theme.setup_performance_monitoring();
});

// Frappe-specific integrations
if (typeof frappe !== 'undefined') {
    // Override frappe's default msgprint with professional styling
    const original_msgprint = frappe.msgprint;
    frappe.msgprint = function(msg, title, as_modal) {
        if (as_modal) {
            return original_msgprint(msg, title, as_modal);
        } else {
            professional_theme.show_professional_alert(msg, 'info');
        }
    };

    // Professional throw with custom styling
    const original_throw = frappe.throw;
    frappe.throw = function(msg) {
        professional_theme.show_professional_alert(msg, 'error');
        return original_throw(msg);
    };

    // Enhanced show_alert
    const original_show_alert = frappe.show_alert;
    frappe.show_alert = function(message, indicator = 'blue') {
        const type_map = {
            'green': 'success',
            'blue': 'info',
            'orange': 'warning',
            'red': 'error'
        };
        
        professional_theme.show_professional_alert(
            message.message || message,
            type_map[indicator] || 'info'
        );
    };
}

// Export for use in other scripts
window.professional_theme = professional_theme;