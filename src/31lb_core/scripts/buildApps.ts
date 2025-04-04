import * as fs from "fs";
import * as cp from 'child_process';
import md5 from 'md5';
import md5Dir from 'md5-dir';

interface BuildCache<K extends PropertyKey, V> {
  key: K;
  value: V;
}

let path = "./src/31lb_core/client/pages/phone/apps";
let appsDir = fs.readdirSync(path);

let cache: BuildCache<string, string>[] = [];
let cachePath = "buildappscache.json";
if (fs.existsSync(cachePath)) {
  cache = JSON.parse(fs.readFileSync(cachePath, "utf-8"));
}

appsDir.forEach((value, index, list) => {
  let cwdVal = path + "/" + value;
  if (fs.readdirSync(cwdVal).length == 0) {
    console.log(value + " is empty, skipping...");
  } else {
    if (!fs.existsSync(cwdVal + "/node_modules")) {
      console.log("node_modules missing, installing... " + value);
      console.log(cp.execSync("npm install", { encoding: "utf-8", cwd: cwdVal }));  
    }
    let md = makeMd5(value);
    console.log("md5 of " + value +  " is: " + md);
    if (cache.length > 0) {
      cache.forEach((element, index, array) => {
        if (element.key == value) {
          if (element.value == md) {
            console.log(value + " is already up-to-date, skipping...");
          } else {
            let index = cache.indexOf({ key: value, value: md});

            build(value);

            cache[index] = { key: value, value: makeMd5(value) };
          }
        }
      });
    } else {
      build(value);
      cache.push({ key: value, value: makeMd5(value) });
    }

    console.log("Copying... " + value);
    console.log(cp.execSync("copyfiles " + cwdVal + "/www/**/* --up 1 ./resources", { encoding: "utf-8" }));
    console.log("===========");
  }
});

fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));

function makeMd5(value: string): string {
  let dmd = "";
  let md5folders = [
    "assets-src",
    "src",
    "node_modules"
  ]
  
  md5folders.forEach((el, index, array) => {
    dmd += md5Dir.sync(path + "/" + value + "/" + el);
  });
  return md5(dmd);
}

function build(value: string) {
  console.log("Building... " + value);
  console.log(cp.execSync("npm run build", { cwd: path + "/" + value, encoding: "utf-8" }));
}