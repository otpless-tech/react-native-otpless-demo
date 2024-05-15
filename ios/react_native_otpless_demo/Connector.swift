//
//  Connector.swift
//  react_native_otpless_demo
//
//  Created by Sparsh on 10/05/24.
//

import OtplessSDK
import Foundation

class Connector: NSObject {
  @objc public static func loadUrl(_ url: NSURL) {
    Otpless.sharedInstance.processOtplessDeeplink(url: url as URL)
  }
  @objc public static func isOtplessDeeplink(_ url: NSURL) -> Bool {
    return Otpless.sharedInstance.isOtplessDeeplink(url: url as URL)
  }
}
