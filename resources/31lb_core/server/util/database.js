import * as alt from 'alt';
import orm from 'typeorm';
var currentConnection;
export default class ConnectionInfo {
    constructor(dbType, dbHost, dbPort, dbUsername, dbPassword, dbName, entityArray) {
        if (currentConnection === undefined) {
            const config = {
                type: `${dbType}`,
                host: `${dbHost}`,
                port: dbPort,
                username: `${dbUsername}`,
                password: `${dbPassword}`,
                database: `${dbName}`,
                entities: entityArray,
                cache: true
            };
            console.log(`---> Starting Database Connection`);
            orm.createConnection(config)
                .then(conn => {
                this.connection = conn;
                conn.synchronize().then(res => {
                    currentConnection = this;
                    console.log('---> Database Connected Successfully');
                    alt.emit('ConnectionComplete');
                    return currentConnection;
                });
            })
                .catch(err => {
                console.log(err);
                throw err;
            });
        }
        return currentConnection;
    }
    fetchData(fieldName, fieldValue, repoName, callback) {
        const repo = this.connection.getRepository(repoName);
        repo.findOne({ where: { [fieldName]: fieldValue } })
            .then(res => {
            return callback(res);
        })
            .catch(err => {
            console.error(err);
            return callback(undefined);
        });
    }
    async fetchDataAsync(fieldName, fieldValue, repoName) {
        return new Promise((resolve, reject) => {
            const repo = this.connection.getRepository(repoName);
            repo.findOne({ where: { [fieldName]: fieldValue } })
                .then(res => {
                return resolve(res);
            })
                .catch(err => {
                console.error(err);
                return reject(undefined);
            });
        });
    }
    fetchLastId(repoName, callback) {
        const repo = this.connection.getRepository(repoName);
        repo.findOne({ order: { id: "DESC" } })
            .then(res => {
            callback(res);
        })
            .catch(err => {
            console.log(err);
            callback(undefined);
        });
    }
    async fetchLastIdAsync(repoName) {
        return new Promise((resolve, reject) => {
            const repo = this.connection.getRepository(repoName);
            repo.findOne({ order: { id: "DESC" } })
                .then(res => {
                return resolve(res);
            })
                .catch(err => {
                console.log(err);
                return reject(undefined);
            });
        });
    }
    fetchAllByField(fieldName, fieldValue, repoName, callback) {
        const repo = this.connection.getRepository(repoName);
        repo.find({ where: { [fieldName]: fieldValue } })
            .then(res => {
            return callback(res);
        })
            .catch(err => {
            console.error(err);
            return callback(undefined);
        });
    }
    async fetchAllByFieldAsync(fieldName, fieldValue, repoName) {
        return new Promise((resolve, reject) => {
            const repo = this.connection.getRepository(repoName);
            repo.find({ where: { [fieldName]: fieldValue } })
                .then(res => {
                return resolve(res);
            })
                .catch(err => {
                console.error(err);
                return reject(undefined);
            });
        });
    }
    upsertData(document, repoName, callback) {
        const repo = this.connection.getRepository(repoName);
        repo.save(document)
            .then(res => {
            return callback(res);
        })
            .catch(err => {
            console.error(err);
            return callback(undefined);
        });
    }
    async upsertDataAsync(document, repoName) {
        return new Promise((resolve, reject) => {
            const repo = this.connection.getRepository(repoName);
            repo.save(document)
                .then(res => {
                return resolve(res);
            })
                .catch(err => {
                console.error(err);
                return reject(undefined);
            });
        });
    }
    insertData(document, repoName, callback) {
        const repo = this.connection.getRepository(repoName);
        repo.insert(document)
            .then(res => {
            return callback(res);
        })
            .catch(err => {
            console.error(err);
            return callback(undefined);
        });
    }
    async insertDataAsync(document, repoName) {
        return new Promise((resolve, reject) => {
            const repo = this.connection.getRepository(repoName);
            repo.insert(document)
                .then(res => {
                return resolve(res);
            })
                .catch(err => {
                console.error(err);
                return reject(undefined);
            });
        });
    }
    updatePartialData(id, partialObjectData, repoName, callback) {
        const repo = this.connection.getRepository(repoName);
        repo.findByIds([id])
            .then(res => {
            if (res.length <= 0)
                return callback(undefined);
            repo.update(id, partialObjectData)
                .then(res => {
                return callback(res);
            })
                .catch(err => {
                console.error(err);
                return callback(undefined);
            });
        })
            .catch(err => {
            console.error(err);
            return callback(undefined);
        });
    }
    async updatePartialDataAsync(id, partialObjectData, repoName) {
        return new Promise((resolve, reject) => {
            const repo = this.connection.getRepository(repoName);
            repo.findByIds([id])
                .then(res => {
                if (res.length <= 0)
                    return resolve(undefined);
                repo.update(id, partialObjectData)
                    .then(res => {
                    return resolve(res);
                })
                    .catch(err => {
                    console.log(err);
                    return reject(undefined);
                });
            })
                .catch(err => {
                console.log(err);
                return reject(undefined);
            });
        });
    }
    fetchByIds(ids, repoName, callback) {
        const repo = this.connection.getRepository(repoName);
        let idRef = ids;
        if (!Array.isArray(ids)) {
            idRef = [ids];
        }
        repo.findByIds(idRef)
            .then(res => {
            if (res.length <= 0)
                return callback(undefined);
            return callback(res);
        })
            .catch(err => {
            console.error(err);
            return callback(undefined);
        });
    }
    async fetchByIdsAsync(ids, repoName) {
        return new Promise((resolve, reject) => {
            const repo = this.connection.getRepository(repoName);
            let idRef = ids;
            if (!Array.isArray(ids)) {
                idRef = [ids];
            }
            repo.findByIds(idRef)
                .then(res => {
                if (res.length <= 0)
                    return resolve(undefined);
                return resolve(res);
            })
                .catch(err => {
                console.error(err);
                return reject(undefined);
            });
        });
    }
    deleteByIds(ids, repoName, callback) {
        const repo = this.connection.getRepository(repoName);
        let idRef = ids;
        if (!Array.isArray(ids)) {
            idRef = [ids];
        }
        repo.delete(idRef)
            .then(res => {
            return callback(res);
        })
            .catch(err => {
            console.error(err);
            return callback(undefined);
        });
    }
    async deleteByIdsAsync(ids, repoName) {
        return new Promise((resolve, reject) => {
            const repo = this.connection.getRepository(repoName);
            let idRef = ids;
            if (!Array.isArray(ids)) {
                idRef = [ids];
            }
            repo.delete(idRef)
                .then(res => {
                return resolve(res);
            })
                .catch(err => {
                console.error(err);
                return reject(undefined);
            });
        });
    }
    fetchAllData(repoName, callback) {
        const repo = this.connection.getRepository(repoName);
        repo.find()
            .then(res => {
            if (res.length <= 0)
                return callback(undefined);
            return callback(res);
        })
            .catch(err => {
            console.error(err);
            return callback(undefined);
        });
    }
    async fetchAllDataAsync(repoName) {
        return new Promise((resolve, reject) => {
            const repo = this.connection.getRepository(repoName);
            repo.find()
                .then(res => {
                if (res.length <= 0)
                    return reject(undefined);
                return resolve(res);
            })
                .catch(err => {
                console.error(err);
                return reject(undefined);
            });
        });
    }
    selectData(repoName, fieldNamesArray, callback) {
        const repo = this.connection.getRepository(repoName);
        let selectionRef = fieldNamesArray;
        if (!Array.isArray(fieldNamesArray)) {
            selectionRef = [selectionRef];
        }
        repo.find({ select: selectionRef })
            .then(res => {
            if (res.length <= 0)
                return callback(undefined);
            return callback(res);
        })
            .catch(err => {
            console.error(err);
            return callback(undefined);
        });
    }
    async selectDataAsync(repoName, fieldNamesArray) {
        return new Promise((resolve, reject) => {
            const repo = this.connection.getRepository(repoName);
            let selectionRef = fieldNamesArray;
            if (!Array.isArray(fieldNamesArray)) {
                selectionRef = [selectionRef];
            }
            repo.find({ select: selectionRef })
                .then(res => {
                if (res.length <= 0)
                    return reject(undefined);
                return resolve(res);
            })
                .catch(err => {
                console.error(err);
                return reject(undefined);
            });
        });
    }
}
