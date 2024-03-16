import Vue from 'vue'
import router from '@/router'
import * as Sentry from '@sentry/vue'


if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    Vue,
    dsn: "https://9c59d2417b7d8e1075e830ddddadee6c@o4505568238632960.ingest.sentry.io/4505650819497984",
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: ["localhost"],
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      }),
      new Sentry.Replay({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}
