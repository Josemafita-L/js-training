export interface InternFormState {
  name: string
  score: number
  role: string
  isPresent: boolean
}

export function prepareInternPayload(
  data: InternFormState
) {
  return JSON.stringify(data)
}