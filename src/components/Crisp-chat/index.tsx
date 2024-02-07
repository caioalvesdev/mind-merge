'use client'

import { useEffect, useState } from 'react'
import { Crisp } from 'crisp-sdk-web'

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('157fbbba-d356-446a-a4f1-96e3a1e62a47')
  }, [])

  return null
}