import { LayoutGrid } from '@/components/ui/layout-grid'
import { cardGrids } from '@/data/card-grid'

export function ImageGrid() {
  return (
    <div className='w-full'>
      <LayoutGrid cards={cardGrids} />
    </div>
  )
}
