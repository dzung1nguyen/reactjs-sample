class StorageUtil {
  private static key(key: string): string {
    const appId: string = process.env.REACT_APP_ID || 'APP_ID'
    return (`${appId}_${key}`).toUpperCase()
  }

  public static hasData(key: string): boolean {
    return !!localStorage[key] && !!localStorage[key].length
  }

  public static get(key: string, _default?: unknown) {
    key = this.key(key)
    return this.hasData(key)
      ? JSON.parse(localStorage[key])
      : _default
  }

  public static set(key: string, value: unknown): void {
    localStorage.setItem(this.key(key), JSON.stringify(value))
  }

  public static remove(key: string): void {
    localStorage.removeItem(this.key(key))
  }

  public static clear(): void {
    localStorage.clear()
  }
}

export default StorageUtil