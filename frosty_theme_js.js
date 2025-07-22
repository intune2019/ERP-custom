// Frosty Grey Professional Theme JavaScript
// Enhanced for TrustInTune - matching In.Tune IQ aesthetic

frappe.provide('frosty_theme');

frosty_theme = {
    init: function() {
        this.setup_frost_effects();
        this.setup_enhanced_animations();
        this.setup_professional_notifications();
        this.setup_glassmorphism_effects();
        this.setup_financial_widgets();
        this.setup_theme_customizer();
        this.setup_keyboard_shortcuts();
    },

    // Enhanced frost effects for that professional look
    setup_frost_effects: function() {
        // Add subtle frost animations to cards
        const cards = document.querySelectorAll('.card, .web-card, .widget');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.background = 'rgba(30, 41, 59, 0.9)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.6), 0 8px 32px rgba(203, 213, 225, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.background = 'rgba(30, 41, 59, 0.8)';
                this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 8px 32px rgba(203, 213, 225, 0.1)';
            });
        });

        // Add frost particle effect on important actions
        this.create_frost_particles();
    },

    create_frost_particles: function() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes frost-particle {
                0% {
                    opacity: 0;
                    transform: translateY(0) scale(0);
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translateY(-20px) scale(1);
                }
            }
            
            .frost-particle {
                position: absolute;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, rgba(203, 213, 225, 0.8), transparent);
                border-radius: 50%;
                pointer-events: none;
                animation: frost-particle 2s ease-out forwards;
            }
            
            @keyframes frost-shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            .frost-shimmer::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, 
                    transparent, 
                    rgba(203, 213, 225, 0.1), 
                    transparent);
                animation: frost-shimmer 2s infinite;
            }
        `;
        document.head.appendChild(style);
    },

    // Professional animations matching your interface
    setup_enhanced_animations: function() {
        // Entrance animations for dashboard elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'frostFadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Apply to dashboard widgets
        const widgets = document.querySelectorAll('.card, .widget, .stats-card');
        widgets.forEach((widget, index) => {
            widget.style.opacity = '0';
            widget.style.transform = 'translateY(30px)';
            widget.style.animationDelay = `${index * 0.1}s`;
            observer.observe(widget);
        });

        // Add CSS animations
        const animationStyles = document.createElement('style');
        animationStyles.textContent = `
            @keyframes frostFadeIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes frostPulse {
                0%, 100% { 
                    box-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
                }
                50% { 
                    box-shadow: 0 0 30px rgba(96, 165, 250, 0.5);
                }
            }
            
            .frost-pulse {
                animation: frostPulse 2s infinite;
            }
            
            @keyframes frostGlow {
                0% { filter: brightness(1); }
                50% { filter: brightness(1.1); }
                100% { filter: brightness(1); }
            }
            
            .frost-glow-hover:hover {
                animation: frostGlow 1s ease-in-out;
            }
        `;
        document.head.appendChild(animationStyles);
    },

    // Professional notification system matching your interface
    setup_professional_notifications: function() {
        // Create notification container
        if (!document.getElementById('frost-notifications')) {
            const container = document.createElement('div');
            container.id = 'frost-notifications';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                pointer-events: none;
            `;
            document.body.appendChild(container);
        }
    },

    show_frost_notification: function(message, type = 'info', duration = 5000) {
        const container = document.getElementById('frost-notifications');
        const notificationId = 'frost-notif-' + Date.now();
        
        const typeColors = {
            success: { bg: 'rgba(52, 211, 153, 0.1)', border: 'rgba(52, 211, 153, 0.3)', icon: 'fas fa-check-circle', color: '#34d399' },
            warning: { bg: 'rgba(251, 191, 36, 0.1)', border: 'rgba(251, 191, 36, 0.3)', icon: 'fas fa-exclamation-triangle', color: '#fbbf24' },
            error: { bg: 'rgba(248, 113, 113, 0.1)', border: 'rgba(248, 113, 113, 0.3)', icon: 'fas fa-times-circle', color: '#f87171' },
            info: { bg: 'rgba(96, 165, 250, 0.1)', border: 'rgba(96, 165, 250, 0.3)', icon: 'fas fa-info-circle', color: '#60a5fa' }
        };

        const config = typeColors[type] || typeColors.info;

        const notification = document.createElement('div');
        notification.id = notificationId;
        notification.style.cssText = `
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(16px);
            border: 1px solid ${config.border};
            border-left: 4px solid ${config.color};
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5), 0 0 20px ${config.bg};
            transform: translateX(400px);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: auto;
            position: relative;
            overflow: hidden;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px;">
                <i class="${config.icon}" style="color: ${config.color}; font-size: 18px;"></i>
                <span style="color: #f8fafc; font-weight: 500; flex: 1;">${message}</span>
                <button onclick="frosty_theme.dismiss_notification('${notificationId}')" 
                        style="background: none; border: none; color: #94a3b8; cursor: pointer; padding: 4px; border-radius: 4px; transition: all 0.2s ease;"
                        onmouseover="this.style.background='rgba(148, 163, 184, 0.1)'; this.style.color='#e2e8f0';"
                        onmouseout="this.style.background='none'; this.style.color='#94a3b8';">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="position: absolute; bottom: 0; left: 0; height: 2px; background: ${config.color}; width: 100%; transform: scaleX(0); transform-origin: left; transition: transform ${duration}ms linear;"></div>
        `;

        container.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            // Start progress bar
            const progressBar = notification.querySelector('div:last-child');
            setTimeout(() => progressBar.style.transform = 'scaleX(1)', 100);
        });

        // Auto dismiss
        if (duration > 0) {
            setTimeout(() => this.dismiss_notification(notificationId), duration);
        }
    },

    dismiss_notification: function(notificationId) {
        const notification = document.getElementById(notificationId);
        if (notification) {
            notification.style.transform = 'translateX(400px)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 400);
        }
    },

    // Glassmorphism effects for that frosty professional look
    setup_glassmorphism_effects: function() {
        // Enhanced glass effects for modals and overlays
        $(document).on('show.bs.modal', '.modal', function() {
            const modal = this;
            setTimeout(() => {
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) {
                    modalContent.style.background = 'rgba(30, 41, 59, 0.95)';
                    modalContent.style.backdropFilter = 'blur(20px)';
                    modalContent.style.border = '1px solid rgba(203, 213, 225, 0.1)';
                    modalContent.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(203, 213, 225, 0.1)';
                }
            }, 50);
        });

        // Glass effect for dropdowns
        $(document).on('shown.bs.dropdown', '.dropdown', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.background = 'rgba(30, 41, 59, 0.95)';
                menu.style.backdropFilter = 'blur(16px)';
                menu.style.border = '1px solid rgba(203, 213, 225, 0.1)';
                menu.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
            }
        });
    },

    // Financial widgets matching your dashboard style
    setup_financial_widgets: function() {
        this.create_financial_chart_styles();
        this.setup_metric_counters();
        this.setup_status_indicators();
    },

    create_financial_chart_styles: function() {
        // Chart.js default colors for frosty theme
        if (typeof Chart !== 'undefined') {
            Chart.defaults.color = '#e2e8f0';
            Chart.defaults.borderColor = 'rgba(203, 213, 225, 0.1)';
            Chart.defaults.backgroundColor = 'rgba(96, 165, 250, 0.1)';
            
            // Custom chart plugin for frost effects
            Chart.register({
                id: 'frostEffect',
                beforeDraw: function(chart) {
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.globalCompositeOperation = 'multiply';
                    ctx.fillStyle = 'rgba(203, 213, 225, 0.02)';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            });
        }
    },

    setup_metric_counters: function() {
        // Animated counter for financial metrics (like your $84,300, $33,600 etc.)
        $('.metric-value, .stat-number').each(function() {
            const $this = $(this);
            const text = $this.text();
            const isMonetary = text.includes(') || text.includes('€') || text.includes('£');
            const isPercentage = text.includes('%');
            
            if (isMonetary || isPercentage || /^\d+$/.test(text.replace(/[,$%]/g, ''))) {
                const finalValue = parseFloat(text.replace(/[,$%]/g, ''));
                const prefix = isMonetary ? text.match(/[$€£]/)?.[0] || ' : '';
                const suffix = isPercentage ? '%' : '';
                
                $this.css({
                    'font-family': 'var(--font-mono)',
                    'font-weight': '600',
                    'color': isMonetary ? '#34d399' : isPercentage ? '#60a5fa' : '#f8fafc'
                });

                $({ countNum: 0 }).animate({
                    countNum: finalValue
                }, {
                    duration: 2000,
                    easing: 'easeOutCubic',
                    step: function() {
                        const current = Math.floor(this.countNum);
                        const formatted = isMonetary ? current.toLocaleString() : current;
                        $this.text(prefix + formatted + suffix);
                    },
                    complete: function() {
                        const formatted = isMonetary ? finalValue.toLocaleString() : finalValue;
                        $this.text(prefix + formatted + suffix);
                    }
                });
            }
        });
    },

    setup_status_indicators: function() {
        // Enhanced status indicators like your "Approved", "Pending", etc.
        $('.status-indicator, .badge').each(function() {
            const $this = $(this);
            const text = $this.text().toLowerCase();
            
            // Add pulsing effect for active statuses
            if (text.includes('active') || text.includes('approved') || text.includes('paid')) {
                $this.addClass('frost-pulse');
            }
            
            // Add hover effects
            $this.css('cursor', 'pointer');
            $this.on('mouseenter', function() {
                $(this).css('transform', 'scale(1.05)');
            }).on('mouseleave', function() {
                $(this).css('transform', 'scale(1)');
            });
        });
    },

    // Theme customizer for frosty adjustments
    setup_theme_customizer: function() {
        const customizer = document.createElement('div');
        customizer.id = 'frost-customizer';
        customizer.style.cssText = `
            position: fixed;
            top: 50%;
            right: -280px;
            width: 300px;
            transform: translateY(-50%);
            background: rgba(30, 41, 59, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(203, 213, 225, 0.1);
            border-radius: 16px 0 0 16px;
            padding: 24px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.7);
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 9999;
        `;

        customizer.innerHTML = `
            <button id="frost-customizer-toggle" style="
                position: absolute;
                left: -50px;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #60a5fa, #3b82f6);
                border: none;
                border-radius: 12px 0 0 12px;
                color: white;
                cursor: pointer;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
                transition: all 0.3s ease;
            " onmouseover="this.style.background='linear-gradient(135deg, #3b82f6, #2563eb)'" 
               onmouseout="this.style.background='linear-gradient(135deg, #60a5fa, #3b82f6)'">
                <i class="fas fa-palette"></i>
            </button>
            
            <div class="frost-customizer-content">
                <h5 style="color: #f8fafc; margin-bottom: 20px; font-weight: 600;">
                    <i class="fas fa-snowflake" style="margin-right: 8px; color: #60a5fa;"></i>
                    Frost Theme Settings
                </h5>
                
                <div style="margin-bottom: 16px;">
                    <label style="color: #e2e8f0; font-size: 14px; margin-bottom: 8px; display: block;">Frost Intensity</label>
                    <input type="range" id="frost-intensity" min="0.5" max="1.5" step="0.1" value="1" style="width: 100%;">
                </div>
                
                <div style="margin-bottom: 16px;">
                    <label style="color: #e2e8f0; font-size: 14px; margin-bottom: 8px; display: block;">Glass Blur</label>
                    <input type="range" id="glass-blur" min="8" max="32" step="2" value="16" style="width: 100%;">
                </div>
                
                <div style="margin-bottom: 16px;">
                    <label style="color: #e2e8f0; font-size: 14px; margin-bottom: 8px; display: block;">Accent Color</label>
                    <div style="display: flex; gap: 8px;">
                        <button class="accent-color" data-color="#60a5fa" style="width: 30px; height: 30px; border: none; border-radius: 8px; background: #60a5fa; cursor: pointer;"></button>
                        <button class="accent-color" data-color="#34d399" style="width: 30px; height: 30px; border: none; border-radius: 8px; background: #34d399; cursor: pointer;"></button>
                        <button class="accent-color" data-color="#fbbf24" style="width: 30px; height: 30px; border: none; border-radius: 8px; background: #fbbf24; cursor: pointer;"></button>
                        <button class="accent-color" data-color="#f87171" style="width: 30px; height: 30px; border: none; border-radius: 8px; background: #f87171; cursor: pointer;"></button>
                    </div>
                </div>
                
                <button id="reset-frost-theme" style="
                    width: 100%;
                    padding: 10px;
                    background: rgba(248, 113, 113, 0.2);
                    border: 1px solid rgba(248, 113, 113, 0.3);
                    border-radius: 8px;
                    color: #f87171;
                    cursor: pointer;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(248, 113, 113, 0.3)'" 
                   onmouseout="this.style.background='rgba(248, 113, 113, 0.2)'">
                    <i class="fas fa-undo"></i> Reset to Default
                </button>
            </div>
        `;

        document.body.appendChild(customizer);

        // Customizer functionality
        document.getElementById('frost-customizer-toggle').addEventListener('click', function() {
            const isOpen = customizer.style.right === '0px';
            customizer.style.right = isOpen ? '-280px' : '0px';
        });

        // Frost intensity control
        document.getElementById('frost-intensity').addEventListener('input', function(e) {
            const intensity = e.target.value;
            document.documentElement.style.setProperty('--frost-opacity', intensity);
            localStorage.setItem('frost-intensity', intensity);
        });

        // Glass blur control
        document.getElementById('glass-blur').addEventListener('input', function(e) {
            const blur = e.target.value;
            document.documentElement.style.setProperty('--glass-blur', `blur(${blur}px)`);
            localStorage.setItem('glass-blur', blur);
        });

        // Accent color control
        document.querySelectorAll('.accent-color').forEach(button => {
            button.addEventListener('click', function() {
                const color = this.dataset.color;
                document.documentElement.style.setProperty('--frost-blue', color);
                document.documentElement.style.setProperty('--border-accent', color);
                localStorage.setItem('accent-color', color);
                
                // Visual feedback
                document.querySelectorAll('.accent-color').forEach(b => b.style.border = 'none');
                this.style.border = '2px solid #f8fafc';
            });
        });

        // Reset button
        document.getElementById('reset-frost-theme').addEventListener('click', function() {
            localStorage.removeItem('frost-intensity');
            localStorage.removeItem('glass-blur');
            localStorage.removeItem('accent-color');
            location.reload();
        });

        // Load saved preferences
        this.load_frost_preferences();
    },

    load_frost_preferences: function() {
        const savedIntensity = localStorage.getItem('frost-intensity');
        const savedBlur = localStorage.getItem('glass-blur');
        const savedColor = localStorage.getItem('accent-color');

        if (savedIntensity) {
            document.getElementById('frost-intensity').value = savedIntensity;
            document.documentElement.style.setProperty('--frost-opacity', savedIntensity);
        }

        if (savedBlur) {
            document.getElementById('glass-blur').value = savedBlur;
            document.documentElement.style.setProperty('--glass-blur', `blur(${savedBlur}px)`);
        }

        if (savedColor) {
            document.documentElement.style.setProperty('--frost-blue', savedColor);
            document.documentElement.style.setProperty('--border-accent', savedColor);
            const colorButton = document.querySelector(`[data-color="${savedColor}"]`);
            if (colorButton) colorButton.style.border = '2px solid #f8fafc';
        }
    },

    // Professional keyboard shortcuts
    setup_keyboard_shortcuts: function() {
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K for global search (common in professional apps)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = document.querySelector('.global-search, [data-doctype="Global Search"]');
                if (searchInput) {
                    searchInput.focus();
                    frosty_theme.show_frost_notification('Global search activated', 'info', 2000);
                }
            }

            // Ctrl/Cmd + D for dashboard
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                window.location.href = '/app';
            }

            // Escape to close customizer
            if (e.key === 'Escape') {
                const customizer = document.getElementById('frost-customizer');
                if (customizer && customizer.style.right === '0px') {
                    customizer.style.right = '-280px';
                }
            }

            // Ctrl/Cmd + Shift + T for theme customizer
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                const customizerToggle = document.getElementById('frost-customizer-toggle');
                if (customizerToggle) customizerToggle.click();
            }
        });
    },

    // Utility functions for financial formatting
    format_currency: function(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    },

    format_percentage: function(value, decimals = 1) {
        return new Intl.NumberFormat('en-US', {
            style: 'percent',
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(value / 100);
    },

    // Performance monitoring
    monitor_performance: function() {
        // Monitor for smooth 60fps animations
        let lastTime = 0;
        let frameCount = 0;
        
        function measureFPS(currentTime) {
            frameCount++;
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                if (fps < 50) {
                    console.warn('Performance warning: FPS dropped to', fps);
                }
                frameCount = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(measureFPS);
        }
        
        requestAnimationFrame(measureFPS);
    }
};

// Initialize frosty theme when document is ready
$(document).ready(function() {
    frosty_theme.init();
    frosty_theme.monitor_performance();
    
    // Show welcome message
    setTimeout(() => {
        frosty_theme.show_frost_notification(
            'Welcome to TrustInTune Professional - Frosty Theme Activated', 
            'success', 
            4000
        );
    }, 1000);
});

// Integration with ERPNext/Frappe
if (typeof frappe !== 'undefined') {
    // Override frappe notifications with frosty style
    const original_show_alert = frappe.show_alert;
    frappe.show_alert = function(message, indicator = 'blue') {
        const type_map = {
            'green': 'success',
            'blue': 'info', 
            'orange': 'warning',
            'red': 'error'
        };
        
        frosty_theme.show_frost_notification(
            message.message || message,
            type_map[indicator] || 'info'
        );
    };

    // Enhanced msgprint with frosty styling
    const original_msgprint = frappe.msgprint;
    frappe.msgprint = function(msg, title, as_modal) {
        if (as_modal) {
            const result = original_msgprint(msg, title, as_modal);
            // Style the modal with frost effects
            setTimeout(() => {
                const modal = document.querySelector('.modal.show .modal-content');
                if (modal) {
                    modal.style.background = 'rgba(30, 41, 59, 0.95)';
                    modal.style.backdropFilter = 'blur(20px)';
                    modal.style.border = '1px solid rgba(203, 213, 225, 0.1)';
                }
            }, 100);
            return result;
        } else {
            frosty_theme.show_frost_notification(msg, 'info');
        }
    };
}

// Export for global use
window.frosty_theme = frosty_theme;