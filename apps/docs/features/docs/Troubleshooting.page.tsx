import { Github } from 'lucide-react'
import Link from 'next/link'
import { cn } from 'ui'
import Breadcrumbs from '~/components/Breadcrumbs'
import { Feedback } from '~/components/Feedback'
import { SidebarSkeleton } from '~/layouts/MainSkeleton'
import { MDXRemoteBase } from './MdxBase'
import { getTroubleshootingUpdatedDates, type ITroubleshootingEntry } from './Troubleshooting.utils'
import { formatError, serializeTroubleshootingSearchParams } from './Troubleshooting.utils.shared'

export default async function TroubleshootingPage({ entry }: { entry: ITroubleshootingEntry }) {
  const dateUpdated = entry.data.database_id.startsWith('pseudo-')
    ? new Date()
    : (await getTroubleshootingUpdatedDates()).get(entry.data.database_id)

  return (
    <SidebarSkeleton
      hideSideNav
      className="@container/troubleshooting-entry-layout w-full max-w-screen-lg mx-auto lg:py-8 lg:px-5"
    >
      <div className="px-5 py-8 lg:px-0 lg:py-0">
        <Breadcrumbs minLength={1} forceDisplayOnMobile />
        <article className="prose max-w-none mt-4">
          <h1>{entry.data.title}</h1>
          {dateUpdated && (
            <p className="text-sm text-foreground-lighter">
              Last edited: {dateUpdated.toLocaleDateString()}
            </p>
          )}
          <hr className="my-7" aria-hidden />
          <div className="grid gap-10 @3xl/troubleshooting-entry-layout:grid-cols-[1fr,250px]">
            <div className="min-w-0">
              <MDXRemoteBase source={entry.content} />
            </div>
            <aside aria-labelledby="heading--metadata" className="not-prose mt-5">
              <h2
                id="heading--metadata"
                className="text-foreground-lighter uppercase text-sm tracking-wide @3xl/troubleshooting-entry-layout:sr-only"
              >
                Metadata
              </h2>
              <hr className="my-6 @3xl/troubleshooting-entry-layout:hidden" aria-hidden />
              {entry.data.topics?.length > 0 && (
                <>
                  <h3 className="text-sm text-foreground-lighter mb-3">Products</h3>
                  <div className="flex flex-wrap gap-0.5">
                    {entry.data.topics.map((topic) => (
                      <Link
                        key={topic}
                        href={`/guides/troubleshooting${serializeTroubleshootingSearchParams({ products: [topic] })}`}
                      >
                        <PillTag className="hover:bg-200 focus-visible:bg-foreground-muted hover:border-control focus-visible:border-control transition-colors">
                          {topic[0].toUpperCase() + topic.slice(1)}
                        </PillTag>
                      </Link>
                    ))}
                  </div>
                  <hr className="my-6" aria-hidden />
                </>
              )}
              {entry.data.errors?.length > 0 && (
                <>
                  <h3 className="text-sm text-foreground-lighter mb-3">Related error codes</h3>
                  <div className="flex flex-wrap gap-0.5">
                    {entry.data.errors.map((error, index) => (
                      <Link
                        key={index}
                        href={`/guides/troubleshooting${serializeTroubleshootingSearchParams({ errorCodes: [formatError(error)] })}`}
                      >
                        <PillTag className="hover:bg-200 focus-visible:bg-foreground-muted hover:border-control focus-visible:border-control transition-colors">
                          {formatError(error)}
                        </PillTag>
                      </Link>
                    ))}
                  </div>
                  <hr className="my-6" aria-hidden />
                </>
              )}
              {entry.data.keywords?.length > 0 && (
                <>
                  <h3 className="text-sm text-foreground-lighter mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-0.5">
                    {entry.data.keywords.map((keyword) => (
                      <Link
                        key={keyword}
                        href={`/guides/troubleshooting${serializeTroubleshootingSearchParams({ tags: [keyword] })}`}
                      >
                        <PillTag className="hover:bg-200 focus-visible:bg-foreground-muted hover:border-control focus-visible:border-control transition-colors">
                          {keyword}
                        </PillTag>
                      </Link>
                    ))}
                  </div>
                  <hr className="my-6" aria-hidden />
                </>
              )}
              <Feedback className="px-0 mb-6 lg:mb-8" />
              {entry.data.github_url && (
                <>
                  <hr className="my-6" aria-hidden />
                  <Link
                    target="_blank"
                    href={entry.data.github_url}
                    className="flex items-center gap-2 text-sm text-foreground-lighter"
                  >
                    <Github size={14} />
                    View discussion on GitHub
                  </Link>
                </>
              )}
            </aside>
          </div>
        </article>
      </div>
    </SidebarSkeleton>
  )
}

function PillTag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn('px-2 py-px border rounded-full inline-flex items-center text-xs', className)}
    >
      {children}
    </span>
  )
}
