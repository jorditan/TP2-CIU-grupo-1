import * as React from "react"
import { cn } from "cn"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type CarouselOptions = {
  loop?: boolean
}

type CarouselProps = {
  opts?: CarouselOptions
  orientation?: "horizontal" | "vertical"
}

type CarouselContextProps = {
  current: number
  count: number
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  canScrollPrev: boolean
  canScrollNext: boolean
  trackRef: React.RefObject<HTMLDivElement | null>
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & CarouselProps) {
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const trackRef = React.useRef<HTMLDivElement | null>(null)
  const loop = opts?.loop ?? false

  React.useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const updateCount = () => {
      const items = track.querySelectorAll('[data-slot="carousel-item"]').length
      setCount(items)
      setCurrent((prev) => (items > 0 ? Math.min(prev, items - 1) : 0))
    }

    const resizeObserver = new ResizeObserver(updateCount)
    resizeObserver.observe(track)

    const mutationObserver = new MutationObserver(updateCount)
    mutationObserver.observe(track, { childList: true })

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  const canScrollPrev = count > 1 && (loop || current > 0)
  const canScrollNext = count > 1 && (loop || current < count - 1)

  const scrollPrev = React.useCallback(() => {
    if (count <= 1) return
    setCurrent((prev) => {
      if (prev > 0) return prev - 1
      return loop ? count - 1 : prev
    })
  }, [count, loop])

  const scrollNext = React.useCallback(() => {
    if (count <= 1) return
    setCurrent((prev) => {
      if (prev < count - 1) return prev + 1
      return loop ? 0 : prev
    })
  }, [count, loop])

  const scrollTo = React.useCallback(
    (index: number) => {
      if (count <= 0) return
      setCurrent(Math.max(0, Math.min(index, count - 1)))
    },
    [count]
  )

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (orientation === "horizontal") {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      } else {
        if (event.key === "ArrowUp") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowDown") {
          event.preventDefault()
          scrollNext()
        }
      }
    },
    [orientation, scrollPrev, scrollNext]
  )

  return (
    <CarouselContext.Provider
      value={{
        current,
        count,
        opts,
        orientation,
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev,
        canScrollNext,
        trackRef,
      }}
    >
      <div
        data-slot="carousel"
        role="region"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative focus-visible:outline-none", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({ className, ...props }: React.ComponentProps<"div">) {
  const { current, orientation, trackRef } = useCarousel()

  return (
    <div data-slot="carousel-viewport" className="overflow-hidden">
      <div
        ref={trackRef}
        data-slot="carousel-content"
        className={cn(
          "flex transition-transform duration-300 ease-in-out",
          orientation === "vertical" && "flex-col",
          className
        )}
        style={{
          transform:
            orientation === "horizontal"
              ? `translateX(-${current * 100}%)`
              : `translateY(-${current * 100}%)`,
        }}
        {...props}
      />
    </div>
  )
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  )
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        "absolute rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -left-12 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ChevronLeft />
      <span className="sr-only">Anterior</span>
    </Button>
  )
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: React.ComponentProps<typeof Button>) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn(
        "absolute rounded-full",
        orientation === "horizontal"
          ? "top-1/2 -right-12 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ChevronRight />
      <span className="sr-only">Siguiente</span>
    </Button>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}
