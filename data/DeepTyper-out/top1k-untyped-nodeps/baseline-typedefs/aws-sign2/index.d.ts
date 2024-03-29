/*!
 *  Copyright 2010 LearnBoost <dev@learnboost.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
declare var crypto: any, parse: any;
declare var keys: string[];
declare function authorization(options: any): string;
declare function hmacSha1(options: any): string;
declare function sign(options: any): any;
declare function signQuery(options: any): string;
declare function stringToSign(options: any): string;
declare function queryStringToSign(options: any): string;
declare function canonicalizeHeaders(headers: any): string;
declare function canonicalizeResource(resource: string): any;
