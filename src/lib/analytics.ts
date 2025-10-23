import { browser, dev } from '$app/environment';

// Type definitions for gtag
declare global {
    interface Window {
        gtag?: (
            command: 'config' | 'event' | 'js' | 'set',
            targetId: string | Date,
            config?: Record<string, any>
        ) => void;
        dataLayer?: any[];
    }
}

// Only track in production and in browser
const shouldTrack = browser && !dev;
// const shouldTrack = browser;

/**
 * Track a custom event in Google Analytics
 * @param eventName - The name of the event
 * @param eventParams - Optional parameters for the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
    if (!shouldTrack || !window.gtag) return;

    window.gtag('event', eventName, eventParams);
}

/**
 * Track a page view
 * @param url - The URL to track
 * @param title - Optional page title
 */
export function trackPageView(url: string, title?: string) {
    if (!shouldTrack || !window.gtag) return;

    window.gtag('event', 'page_view', {
        page_path: url,
        page_title: title
    });
}

/**
 * Track when a user clicks on a navigation link
 * @param linkText - The text of the link clicked
 * @param destination - The destination URL
 */
export function trackNavigation(linkText: string, destination: string) {
    trackEvent('navigation_click', {
        link_text: linkText,
        destination: destination
    });
}

/**
 * Track when a user clicks on an external link
 * @param linkText - The text of the link
 * @param url - The external URL
 */
export function trackOutboundLink(linkText: string, url: string) {
    trackEvent('outbound_click', {
        link_text: linkText,
        link_url: url,
        link_domain: new URL(url).hostname
    });
}

/**
 * Track scroll depth on a page
 * @param depth - The scroll depth percentage (25, 50, 75, 90, 100)
 * @param page - The page where scrolling occurred
 */
export function trackScrollDepth(depth: number, page: string) {
    trackEvent('scroll_depth', {
        scroll_depth: depth,
        page: page
    });
}

/**
 * Track essay reading progress
 * @param essayId - The ID of the essay
 * @param timeSpent - Time spent in seconds
 * @param scrollDepth - How far the user scrolled (percentage)
 */
export function trackEssayEngagement(essayId: string, timeSpent: number, scrollDepth: number) {
    trackEvent('essay_engagement', {
        essay_id: essayId,
        time_spent_seconds: timeSpent,
        scroll_depth: scrollDepth
    });
}

/**
 * Track interactions with software demos
 * @param demoName - Name of the demo (pushfold, sudoku, tictactoe)
 * @param action - The action taken (start, interact, complete)
 */
export function trackDemoInteraction(demoName: string, action: string) {
    trackEvent('demo_interaction', {
        demo_name: demoName,
        action: action
    });
}
