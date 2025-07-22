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
        const container = document.getElementByI