export interface SidenavLinkNode {
  type: 'link'
  label: string
  icon?: string
  target: string
}

export interface SidenavParentNode {
  type: 'parent'
  label: string
  icon?: string
  children: SidenavNode[]
}

export type SidenavNode = SidenavLinkNode | SidenavParentNode

export interface SidenavGroup {
  label: string
  items: SidenavNode[]
}
