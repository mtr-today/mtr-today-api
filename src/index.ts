import Koa from 'koa'
import Router from '@koa/router'
import { Line, lineConfig } from './constants/line'
import cors from '@koa/cors'
import { linesStops, Stop, stops } from './constants/stop'
import { scheduleService } from './services/scheduleService'
import './utils/dayjs'

const koa = new Koa()
koa.use(cors({ origin: 'http://localhost:5173' }))

const router = new Router()

router.get('/api/v1/lines', async ctx => {
  ctx.body = lineConfig
})

router.get('/api/v1/lines/:line', async ctx => {
  const { line } = ctx.params
  ctx.body = lineConfig[line as Line]
})

router.get('/api/v1/stops', async ctx => {
  ctx.body = stops
})

router.get('/api/v1/stops/:stop', async ctx => {
  const { stop } = ctx.params
  ctx.body = stops[stop as Stop]
})

router.get('/api/v1/lines/:line/stops', async ctx => {
  const { line } = ctx.params
  ctx.body = linesStops[line as Line]
})

router.get('/api/v1/schedules', async ctx => {
  ctx.body = await scheduleService.getSchedule()
})

router.get('/api/v1/lines/:line/schedules', async ctx => {
  const { line } = ctx.params

  ctx.body = await scheduleService.getLineSchedule(line as Line)
})

router.get('/api/v1/lines/:line/stops/:stop/schedules', async ctx => {
  const { line, stop } = ctx.params

  ctx.body = await scheduleService.getStopSchedules(line as Line, stop as Stop)
})

koa.use(router.routes()).use(router.allowedMethods())
koa.listen(3000)
