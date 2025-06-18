script>
        function showTab(tabName) {
            // Hide all tab contents
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(content => content.classList.remove('active'));
            
            // Remove active class from all tabs
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            
            // Show selected tab content and mark tab as active
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }
        
        function showDetails(entityType) {
            const details = {
                economy: "Economy entity represents countries/territories with their economic indicators, trade relationships, and port infrastructure capabilities.",
                port: "Port entity captures physical infrastructure, operational capacity, geographical location, and performance characteristics.",
                commercial_market: "Commercial Market entity defines trade categories, cargo types, and business segments operating through ports.",
                vessel: "Vessel entity includes ship characteristics, operational parameters, and movement patterns across ports.",
                performance: "Performance entity measures efficiency metrics, time-based indicators, and operational effectiveness."
            };
            
            alert(details[entityType] || "Entity details not available.");
        }
        
        // Add some interactive animations
        document.addEventListener('DOMContentLoaded', function() {
            const entities = document.querySelectorAll('.entity');
            entities.forEach((entity, index) => {
                entity.style.animationDelay = (index * 0.1) + 's';
                entity.style.animation = 'fadeInUp 0.6s ease forwards';
            });
        });
    </script>
