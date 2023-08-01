import mongoose from 'mongoose'

class DatabaseConnection {
  private dbConnections: Record<string, typeof mongoose | null> = {}

  /**
   * Connect to MongoDB
   * @param MONGO_URI //Example: mongodb+srv://<username>:<password>@corecluster.xqmchqd.mongodb.net
   * @param DB_NAME //Example: testing
   */
  async connect(
    MONGO_URI: string,
    DB_NAME: string
  ): Promise<typeof mongoose | null> {
    if (!DB_NAME) throw new Error('DB_NAME is not defined!')
    if (!MONGO_URI) throw new Error('MONGO_URI is not defined!')

    if (this.dbConnections[DB_NAME]) {
      return this.dbConnections[DB_NAME]
    }

    mongoose.set('strictQuery', false)
    try {
      const connection = await mongoose.connect(
        `${MONGO_URI}/${DB_NAME}?retryWrites=true&w=majority`
      )
      console.log(`Connected to ${DB_NAME} successfully!`)
      this.dbConnections[DB_NAME] = connection
      return connection
    } catch (error) {
      console.log(`Failed to connect to ${DB_NAME}!`)
      this.dbConnections[DB_NAME] = null
      throw error
    }
  }
}

export const DBConnection = new DatabaseConnection()
