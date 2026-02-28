(function($){

    $.fn.simpleTabs = function(options){

        const settings = $.extend({
            activeClass: "active",
            animationSpeed: 300,
            defaultTab: null
        }, options);

        return this.each(function(){

            const container = $(this);
            const tabs = container.find(".tab-nav li");
            const panels = container.find(".tab-panel");

            // Activate Tab Function
            function activateTab(tabId){
                tabs.removeClass(settings.activeClass);
                panels.hide();

                const activeTab = tabs.filter("[data-tab='" + tabId + "']");
                activeTab.addClass(settings.activeClass);

                $("#" + tabId).fadeIn(settings.animationSpeed);

                // Update URL hash
                window.location.hash = tabId;
            }

            // Click Event
            tabs.on("click", function(){
                const tabId = $(this).data("tab");
                activateTab(tabId);
            });

            // Keyboard Accessibility
            tabs.attr("tabindex", "0");

            tabs.on("keydown", function(e){
                let index = tabs.index(this);

                if(e.key === "ArrowRight"){
                    index = (index + 1) % tabs.length;
                    tabs.eq(index).focus().click();
                }

                if(e.key === "ArrowLeft"){
                    index = (index - 1 + tabs.length) % tabs.length;
                    tabs.eq(index).focus().click();
                }

                if(e.key === "Enter"){
                    $(this).click();
                }
            });

            // Hash Navigation
            const hash = window.location.hash.replace("#", "");

            if(hash){
                activateTab(hash);
            }
            else if(settings.defaultTab){
                activateTab(settings.defaultTab);
            }
            else{
                activateTab(tabs.first().data("tab"));
            }

        });
    };

})(jQuery);